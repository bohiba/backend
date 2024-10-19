require('dotenv').config();
const UserModel = require("../models/user_models");
const { generateUniqueID } = require("../services/auth_services");
const DateTimeGenerator = require("../utils/date_time_generator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { logger, errorLogger } = require('../utils/logger');
const UserRoles = require('../utils/roles');
const tokenBlackList  = new Set();

class UserMiddleware {

    static isTokenBlackList({ token }) {
        var isTokenInBlackList = tokenBlackList.has(token);
        
        if (isTokenInBlackList) {
            return {
                code: 200,
                success: true,
                error: {
                    message: `Token expired and logged out successfully.`,
                }
            }
        } else {
            return {
                code: 400,
                success: false,
                error: {
                    message: `Token is not black listed. Something went wrong.`,
                }
            }
        }

    }

    static blackListToken({ token }) {
        return tokenBlackList.add(token);
    }

    static verifyToken({ token }) {
        try {
            const decode = jwt.verify(token, secretKey);
            return decode;
        } catch (error) {
            return null;
        }
    } 

    static generateToken({ user }) {
        const payload = { 
            user_id: user.user_id,
            email: user.email,
        };
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(payload, secretKey, {expiresIn: `24h`});
        return token;
    }

    static async findAllAdmin({ roles }) {
        try {
            var allAdmins = await UserModel.find({ roles: roles });
            logger({ text: ` Admins: ${allAdmins}` });
            return allAdmins;
         
        } catch (error) {
            logger({ text: `${error.message}` });   
            return null;
        }
    }

    static async findByUserID({ user_id }) {
        var findUser = await UserModel.findOne({ user_id });
        return findUser;
    }
    
    // Check if any [email] is associated with existing user.
    static async findByEmail({ email }){
        return await UserModel.findOne({ email });
    }
    
    // Check if any mobile_number is associated with existing user.
    static async findByMobileNumber({ mobile_number }) {
        return await UserModel.findOne({ mobile_number });
    }

    // encrypt Password
    static async encryptPassword({ password }) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error encrypting password:', error);
            throw error;
        }
    }

    static async comparePassword({password, serverPassword}) {
        return await bcrypt.compare(password, serverPassword);
    }

    static async addUser({ email, mobile_number, password, roles, createdBy }){
        try {
           const isEmailExist = await UserMiddleware.findByEmail({ email: email });
           const isMobileNumberExist = await UserMiddleware.findByMobileNumber({ mobile_number: mobile_number });
           const userType = await UserMiddleware.findAllAdmin({ roles: roles });
           
           switch (roles) {
            case UserRoles.superAdmin:
                if (userType.length >= 2) {
                    return {
                        code: 492,
                        success: false,
                        error: {
                            message: `Number of Admin user reached limit. To add new Super admin delete inactive Super-Admin.`,
                        }
                    }
                }
                break;
            
            case UserRoles.admin:
                if(userType.length >= 5) {
                    return {
                        code: 492,
                        success: false,
                        error: {
                            message: `Number of Admin has reached limit. To add new Admin delete inactive Admin.`,
                        }
                    }
                }
                break;
            
            case UserRoles.contentAdmin:    
                if(userType.length >= 1) {
                    return {
                        code: 492,
                        success: false,
                        error: {
                            message: `Number of Admin has reached limit. To add new Admin delete inactive Admin.`,
                        }
                    }
                }
                break;    
            
            case UserRoles.contentWriter:
                if(userType.length >= 2) {
                    return {
                        code: 492,
                        success: false,
                        error: {
                            message: `Number of Admin has reached limit. To add new Admin delete inactive Admin.`,
                        }
                    }
                }
                break;        
            default:
                break;
            }
        
           if (isEmailExist) {
                return {
                    code: 409,
                    success: false,
                    error: {
                        message: `${email} address already in use.`,
                    }
                }
            }

            if (isMobileNumberExist) {
                return  {
                    code: 409,
                    success: false,
                    error: {
                        message: `${mobile_number} already in use.`,
                    }
                }
            }

            if (!isEmailExist && !isMobileNumberExist) {
                const userID = await generateUniqueID({ roles: roles });

                if (password === null || password.trim() === ''|| password === undefined) {
                    password = "bohiba2023"
                }

                const encryptPassword = await UserMiddleware.encryptPassword({ password: password }); 
                const userData = new UserModel({
                    user_id: userID,
                    email: email,
                    mobile_number: mobile_number,
                    password: encryptPassword,
                    roles: roles,
                    createdBy: createdBy,
                    createdAt: DateTimeGenerator.dateTimeStampGenerator()
                });

                var result = await userData.save();
                return {
                    code: 201,
                    success: true, 
                    data: result,
                }
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                error: {
                    message: "Someting went wrong while adding user."
                },
            }
        }
    }

    static async loginMiddleware({ user_id, password }) {
        try {
            const findUser = await UserMiddleware.findByUserID({ user_id: user_id });
            if (!findUser || findUser === null || findUser === undefined) {
                return {
                    code: 404,
                    success: false,
                    error: { 
                        message: `User not found.` 
                    }
                }
            } else {
                const matchPassword = await UserMiddleware.comparePassword({ password: password, serverPassword: findUser.password });
                if (matchPassword) {
                    const token = UserMiddleware.generateToken({ user: findUser });
                    return {
                        code: 200,
                        success: true,
                        data: {
                            user_id: findUser.user_id,
                            roles: findUser.roles,
                            email: findUser.email,
                            mobile_number: findUser.mobile_number,
                            createdBy: findUser.createdBy,
                            createdAt: findUser.createdAt,
                            password: findUser.password,
                            token: token
                        },
                    }
                } else {
                    return {
                        code: 401,
                        success: false,
                        error: {
                            message: `Password doesn't match.`
                        }
                    }
                }
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                error: {
                    message: error.message,
                }
            }
        }
    }
}

module.exports = UserMiddleware;