const AuthMiddleWare = require('../middleware/auth_middleware');
const UserModel = require('../models/user_model');
const ResponseHandler = require('../services/response_handler');
const AuthServices = require('../services/auth_services');
require('dotenv').config();

class AuthController {

    /**
     * - Signup is used for authentication of admin level user
     * @param {*} user_name
     * @param {*} email
     * @param {*} mobile_number
     * @param {*} dob
     * @param {*} password
     */
    static async signUp(req, res, next) {
        try {
            const { user_name, name, email, mobile_number, dob, password } = req.body;
            let signUpValidation = await AuthMiddleWare.signUpValidation({ key: req.body });

            if (signUpValidation) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 409,
                    message: signUpValidation.message, 
                });
            }

            const existingUserEmail = await UserModel.findOne({ email });
            if (existingUserEmail) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 409,
                    message: `Failure`, 
                    data: {
                        message: `Email already Exist`
                    }
                });
            }
            
            const existingUserMobile = await UserModel.findOne({ mobile_number });
            if(existingUserMobile){
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 409,
                    message: `Failure`, 
                    data: {
                        message: `Mobile number already exist.`
                    }
                });
            }

            let emailRes = await AuthMiddleWare.signUpMiddleware( user_name, name, email, mobile_number, dob, password )
            return ResponseHandler.send(res, { 
                success: emailRes.success, 
                statusCode: emailRes.statusCode,
                error: emailRes.error,
                message: emailRes.message,
                data: emailRes.data,
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }

    /**
     * - Signin function is used to authenticate admin level user like
     * - For now, It only support Super Admin and Admin authntication.
     * - Next on validation success call dashboard API or complete authentication API.
     * @param {*} user_id 
     * @param {*} password 
     */
    static async signIn(req, res, next) {
        try {
            const {user_id, password} = req.body;

            const userExist = await AuthMiddleWare.siginMiddleware({ userID: user_id});
            if(!userExist) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 404,
                    message: "Incorrect User ID.", 
                });
            }

            const isMatch = await userExist.comparePassword(password);
            if( !isMatch){
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 401,
                    message: "Invalid Password", 
                });
            } 
            
            let tokenData = {_id: userExist._id, user_id: userExist.user_id}
            const token = await AuthMiddleWare.generateToken(tokenData, process.env.SECRET_KEY, '1m');
            req.session.user = {
                user_id: userExist.user_id,
                name: userExist.name,
                email: userExist.email,
                mobile_number: userExist.mobile_number,
                is_verified: userExist.is_verified,
                dob: userExist.dob,
                role: userExist.role,
                status: userExist.status,
                created_at: userExist.created_at,
                updated_at: userExist.updated_at,
                deleted_at: userExist.deleted_at,
            };
          
            return ResponseHandler.send(res, {
                success: true, 
                statusCode: 200,
                message: "Success", 
                token: token,
                data: {
                    user_id: userExist.user_id,
                    name: userExist.name,
                    email: userExist.email,
                    mobile_number: userExist.mobile_number,
                    is_verified: userExist.is_verified,
                    dob: userExist.dob,
                    role: userExist.role,
                    status: userExist.status,
                    created_at: userExist.created_at,
                    updated_at: userExist.updated_at,
                    deleted_at: userExist.deleted_at,
                }
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 500,
                error: error.message,
                message: `Internal Server Error`,
            });
        }
    }

    /**
     * - Signin function is used to authenticate admin level user like
     * - For now, It only support Super Admin and Admin authntication.
     * @param {*} token
     */
    static async logOut(req, res, next) {
        const token = req.headers["token"];
        if (token) {
            // TokenBlacklist.add({ token });
            req.session.destroy((error)=> {
                if (error) ResponseHandler.send(res, {
                    success: false,
                    statusCode: 500,
                    error: `Failed to logged out.`,
                    message: "Failed",
                });
            });
        }

        res.clearCookie(`connect.sid`, { path: "/" });
        return  ResponseHandler.send(res, {
            success: true, 
            statusCode: 200,
            message: "User signed out successfully", 
            
        });
    }

    /**
     * - Signin function is used to authenticate admin level user like
     * - For now, It only support Super Admin and Admin authntication.
     * - Next verifyOtp API
     * @param {*} email
     */
    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 404,
                    message: "User not found", 
                });
            } else {
                const token = await AuthMiddleWare.generateToken({ _id: user._id }, process.env.SECRET_KEY, '1h');
                const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${token}`;
                let mailResponse = await AuthServices.sendEmail({ 
                    response: user,
                    to: email,
                    subject: 'Reset Password',
                    html: `
                        <p>Hello ${user.user_name ?? "Bohibian"},</p>
                        <p>We received a request to reset your password for your Bohiba account. If you made this request, Please click the button below to reset your password:</p>
                        <p><a href="${resetUrl}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007bff; text-decoration:none; border-radius:5px;">Reset Password</a></p>
                        <p>If the button above does not work, you can copy and paste the following link into your browser:</p>
                        <p><a href="${resetUrl}">${resetUrl}</a></p>
                        <p>This link will expire in 1 hours. If you did not request a password reset, you can safely ignore this email—your account is secure.</p>
                        <p>If you have any questions or need further assistance, Please don't hesitate to contact our support team.</p>
                        <p>Best regards,</p>
                        <p>Bohiba Official</p>
                        <p>support@bohiba.com</p>
                    `
                });
                return ResponseHandler.send(res, {
                    success: mailResponse.success,
                    statusCode: mailResponse.statusCode,
                    error: mailResponse.error,
                    message: mailResponse.message,
                    data: mailResponse.data,
                });
            }
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                statusCode: 500,
                error: error.message,
                message: `Internal Server Error`, 
            });
        }
    }

    /**
     * - Signin function is used to authenticate admin level user like
     * - For now, It only support Super Admin and Admin authntication.
     * - Next verifyOtp API
     * @param {*} email
     */
    static async resetPassword(req, res, next) {
        try {
            const { old_password, new_password} = req.body;
            const user = req.session.user;
            
            if (!user) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 404,
                    message: "User not found", 
                });
            } else {
                const userData = await UserModel.findOne({ user_id: user.user_id });
                const isMatch = await userData.comparePassword(old_password);
                if (!isMatch) {
                    return ResponseHandler.send(res, {
                        success: false, 
                        statusCode: 401,
                        message: "Invalid password", 
                    });
                } else {
                    userData.password = new_password;
                    await userData.save();
                    return ResponseHandler.send(res, {
                        success: true, 
                        statusCode: 200,
                        message: "Password reset successfull", 
                    });
                }
            }
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                statusCode: 500,
                error: error.message,
                message: `Internal Server Error`, 
            });
        }
    }

     /**
     * - Signin function is used to authenticate admin level user like
     * - For now, It only support Super Admin and Admin authntication.
     * @param {*} otp
     */
    static async verifyOtp(req, res, next) {
        try {        
            const { otp } = req.body;
            const userObj = await UserModel.findOne({ otp });
            if(userObj.is_verified === true) {
                return ResponseHandler.send(res, {
                    success: true,
                    statusCode: 200,
                    message: "Verified user",
                    data: userObj,
                });
            } else if (userObj.is_verified === false) {
                userObj.is_verified = true;
                const response = await AuthMiddleWare.verifyOtpMiddleware( userObj );
                return ResponseHandler.send(res, {
                    success: response.success,
                    statusCode: response.statusCode,
                    error: response.error,
                    message: response.message,
                    data: response.data
                });
            } else {
                return ResponseHandler.send(res, {
                    success: false,
                    statusCode: 400, 
                    message: "Invalid OTP. Re-try again.",
                }); 
            }
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }
}

module.exports = AuthController