const UserModel = require("../models/user_model");
const ResponseHandler = require("../services/response_handler");
const AuthServices = require('../services/auth_services');
const { GlobalServices , IDType } = require("../services/global_serivces");

class UserMiddleware {
    static async validateAddUserData(req, res, next) {
        const requirefield = [email, mobile_number, role];
        const missingOrEmptyFields = requirefield.filter(
            field => !req.body[field] || req.body[field].toString().trim() === ''
        );

        if (missingOrEmptyFields.length > 0) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 400,
                error: `${missingOrEmptyFields.join(`,`)} are missing`,
                message: `Failure`
            });
        }
        next();
    }

    static async addUserMiddleware( name, email, mobile_number, role, dob ) {
        let uniqueID = await GlobalServices.generateUniqueID({ type: IDType.ALL_USER });
        let addUserModel = UserModel({
            user_id: uniqueID,
            name: name,
            email: email,
            mobile_number: mobile_number,
            dob: dob,
            role: role,
            password: `Bohiba2025`
        });

        const saveUser = await addUserModel.save();
        if (saveUser) {
            const emailResponse = await AuthServices.sendEmail({
                to: email,
                subject: 'Account Created',
                html: `
                <body style="font-family: 'Poppins', sans-serif; font-size: 16px; color: #333; line-height: 1.6; background-color: #f9f9f9; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 25px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <!-- Header -->
                    <div style="background-color: #047BFC; color: #ffffff; text-align: center; padding: 20px;">
                        <h1 style="font-size: 24px; margin: 0;">Welcome to Bohiba!</h1>
                        <p style="font-size: 18px; margin: 5px 0;">Your account is ready to use.</p>
                    </div>
    
                    <!-- Main Content -->
                    <div style="padding: 20px; text-align: left;">
                        <p>Hi <strong>${saveUser.name || 'User'}</strong>,</p>
                        <p>We are thrilled to inform you that your account on <strong>Bohiba</strong> has been successfully created. Below are your account details:</p>
                        <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 8px;">
                        <p style="margin: 0; font-size: 16px;"><strong>User ID:</strong> <span style="color: #047BFC;">${saveUser.user_id}</span></p>
                        <p style="margin: 0; font-size: 16px;"><strong>Password:</strong> <span style="color: #047BFC;">${password}</span></p>
                    </div>
    
                        <p style="font-size: 14px; color: #555;">Please keep this information secure, as it will be required to log in and access Bohiba services.</p>
                        <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
    
                        <!-- Contact Information -->
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p>If you need assistance, contact us at:</p>
                        <p style="text-align: center;">
                        <a href="mailto:support@bohiba.com" style="color: #047BFC; text-decoration: none; font-weight: bold;">support@bohiba.com</a>
                    </p>
                    <p style="text-align: center; font-size: 14px; color: #666;">Thank you for choosing <strong>Bohiba</strong>.</p>
                </div>
    
                <!-- Footer -->
                <div style="background-color: #f4f4f4; text-align: center; padding: 10px 20px; font-size: 14px; color: #999;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} Bohiba. All rights reserved.</p>
                </div>
            </div>
            </body>`});

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
}

module.exports = UserMiddleware;