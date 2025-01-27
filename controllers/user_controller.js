const ResponseHandler = require(`../services/response_handler`);
const  UserModel  = require(`../models/user_model`);
const UserRole  = require(`../utils/roles`);

class  UserController {
    static async updateRole( req, res, next ) {
       try {
        const { user_id, role } = req.body;
        if (!user_id) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 404,
                message: `user_id key is required field`,  
            });
        } 
        
        if (!role) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 404,
                message: `role key is required field`, 
            });
        }

        let sessionUser = req.session.user;

        if ( role === sessionUser.role) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 404,
                message: `You are already ${role}.`, 
            });
        }

        let allowedUserRole = [
            UserRole.admin,
            UserRole.superAdmin,
            UserRole.tipperowner,
            UserRole.truckdriver, 
            UserRole.developer, 
            UserRole.truckmanager, 
            UserRole.contentWriter
        ];

        if (!allowedUserRole.includes(role)) {
            return ResponseHandler.send(res, {
                success: false, 
                statusCode: 404,
                message: `Invalid role type`, 
            });
        }

        const userObj = await UserModel.findOneAndUpdate({ user_id: user_id }, { role: role, updated_at: new Date() }, { new: true });
        if (!userObj) {
            return ResponseHandler.send(res, {
                success: false, 
                statusCode: 404,
                message: `Internal User ID`, 
            });
        }
        return ResponseHandler.send(res, {
            success: true, 
            statusCode: 200,
            message: `Success`,
            data: {
                user_id: userObj.user_id,
                user_name: userObj.user_name,
                email: userObj.email,
                role: userObj.role,
                created_at: userObj.created_at,
                updated_at: userObj.updated_at,
                deleted_at: userObj.deleted_at,
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

    static async verifyAndUpdateDL(req, res, next) {}

    static async verifyAndUpdateAadhar(req, res, next) {}

    static async verifyAndUpdatePAN(req, res, next) {}
}

module.exports = UserController;