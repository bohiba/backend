const UserModel = require('../models/user_model');
const ResponseHandler = require('../services/response_handler');
const { GlobalServices, IDType } = require('../services/global_serivces');
const jwt = require('jsonwebtoken');

class AuthMiddleware {
    static async signUpValidation({ key }) {
        const requiredFields = [
            `name`, `mobile_number`, `email`, `dob`, `password`
        ];
        
        const missingOrEmptyFields = requiredFields.filter(
            field => !key[field] || key[field].toString().trim() === ''
        );
        
        if (missingOrEmptyFields.length > 0) {
            return { 
                message: `Missing or empty required fields: ${missingOrEmptyFields.join(', ')}` 
            };
        }
    }

    static async signUpMiddleware( user_name, name, email, mobile_number, dob, password ) {
        let uniqueID = await GlobalServices.generateUniqueID({ type: IDType.ALL_USER });
        let registerUser = UserModel({
            user_id: uniqueID,
            name: name,
            email: email,
            user_name: user_name,
            dob: dob,
            mobile_number: mobile_number,
            password: password
        });
        const saveUser = await registerUser.save();
        if (saveUser) {
           const emailResponse = await AuthServices.sendEmail({
            to: email,
            subject: 'Account Created Successfully',
            html: `
            <body style="font-family: 'Poppins'; font-size: 16px; color: #333; line-height: 1.6; background-color: #f4f4f4; padding: 20px; margin: 0;">
                <div style="max-width: 600px; margin: 25px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <div style="background-color: #047BFC; color: #ffffff; text-align: center; padding: 20px 10px;">
                        <h1 style="font-size: 24px; margin: 0;">Welcome to Bohiba!</h1>
                        <p style="font-size: 18px; margin: 5px 0;">Your account has been successfully created.</p>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <p>Hi <strong>${saveUser.name || 'User'}</strong>,</p>
                        <p>Congratulations! Your account with <strong>Bohiba</strong> has been successfully created. Below is your unique User ID:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <p style="font-size: 28px; font-weight: bold; color: #047BFC; background: #f0f8ff; border-radius: 8px; padding: 10px 20px; display: inline-block;">${saveUser.user_id}</p>
                        </div>
                        <p style="font-size: 14px; color: #555;">Keep this User ID safe as it will be required for logging in and accessing our services.</p>
                        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p>If you need assistance, please contact us at:</p>
                        <p style="text-align: center;">
                        <a href="mailto:support@bohiba.com" style="color: #047BFC; text-decoration: none; font-weight: bold;">support@bohiba.com</a>
                        </p>
                        <p style="text-align: center; font-size: 14px; color: #666;">Thank you for choosing <strong>Bohiba</strong>.</p>
                    </div>
                <div style="background-color: #f4f4f4; text-align: center; padding: 10px 20px; font-size: 14px; color: #999;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} Bohiba. All rights reserved.</p>
                </div>  
            </div>
        </body>`,});

            return {
                success: emailResponse.success,
                statusCode: emailResponse.statusCode,
                error: emailResponse.error,
                message: emailResponse.message,
                data: {
                    user_id: saveUser.user_id,
                    name: saveUser.name,
                    email: saveUser.email,
                    mobile_number: saveUser.mobile_number,
                    is_verified: saveUser.is_verified,
                    dob: saveUser.dob,
                    status: saveUser.status,
                    password: saveUser.password,
                    created_at: saveUser.created_at,
                    updated_at: saveUser.updated_at,
                    delete_at: saveUser.deleted_at,
                }
            };
        } else {
            return {
                success: false,
                statusCode: 404,
                error: `Error while saving user`,
                message: `Failure`,
            };
        }
    }

    static async verifyOtpMiddleware( user ) {
        try {
            let uniqueID = await GlobalServices.generateUniqueID({ type: IDType.OTP });
            let formatUserObj = UserModel({
                user_id: uniqueID,
                name: user.name,
                email: user.email,
                is_verified: user.is_verified,
                mobile_number: user.mobile_number,
                dob: user.dob,
                role: user.role,
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at,
                deleted_at: user.delete_at
            });
            let saveUser = await formatUserObj.save();
            if (saveUser.is_verified) {
                let emailResponse = await AuthServices.sendEmail({
                    user: saveUser,
                    to: saveUser.email,
                    subject: 'Account Created Successfully',
                    html: `
                    <body style="font-family: Poppins, sans-serif; font-size: 16px;">
                        <p>Welcome,</p>
                        <p>Congratulations! Your account with <strong>Bohiba</strong> has been created successfully.</p>
                        <p>You User ID is <strong>${saveUser.user_id}</strong>. 
                        <p>You can now log in and explore our features and services. If you have any questions or need assistance, feel free to reach out to our support team.</p>
                        <p>Best regards,</p>
                        <p><strong>Bohiba</strong></p>
                        <p>support@bohiba.com</p>
                    </body>
                    `,
                });
                return emailResponse;
            } else {
                return saveUser;
            }
        } catch (error) {
          return {
                success: false,
                statusCode: 500,
                error: error.message,
                message: 'Internal Server Error',
            }
        }
    }

    static async siginMiddleware({ userID }) {
       return await UserModel.findOne({ user_id: userID});
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }

    static async verifyToken(req, res, next) {
        const token = req.headers['token'];
        if (!token) {
            return ResponseHandler.send(res ,{
                success: false,
                statusCode: 404,
                message: "Access denied. No token provided."
            });
        }
        try {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    return ResponseHandler.send(res ,{
                        success: false,
                        statusCode: 404,
                        message: "Failed to authenticate token"
                    });
                }
                req.user = user;
            });
            next();
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 500,
                error: error.message,
                message: `Invalid or expired token.`,
            });
        }
    }
};

module.exports = AuthMiddleware;