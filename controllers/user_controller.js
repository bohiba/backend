const ResponseHandler = require(`../services/response_handler`);
const  UserModel  = require(`../models/user_model`);
const AuthService = require(`../services/auth_services`);
const UserMiddleware = require(`../middleware/user_middleware`);

class  UserController {
    static async getAllUser (req, res, next) {
        try {
            const allUsers = await UserModel.find().select('-_id -__v -password').lean();
            return ResponseHandler.send(res, {
              success: true,
              statusCode: 200,
              message: `Successfull`,
              data: allUsers,
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
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async addUser (req, res, next) {
        try {
            const { name, email, mobile_number, role, dob} = req.body;
            const existingUserEmail = await UserModel.findOne({ email });
            if (existingUserEmail) {
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 409,
                    message: `Email already exist.`, 
                    data: req.body
                });
            }
            
            const existingUserMobile = await UserModel.findOne({ mobile_number });
            if(existingUserMobile){
                return ResponseHandler.send(res, {
                    success: false, 
                    statusCode: 409,
                    message: `Mobile number already exist.`, 
                    data: req.body
                });
            }

            let emailRes = await UserMiddleware.addUserMiddleware( name, email, mobile_number, role, dob );
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

    static async updateUser (req, res, next) {
       try {
        const { user_id, name, email, mobile_number, is_verified, dob, role, status } = req.body;
        if (!user_id) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 400,
                message: 'User ID is required.',
            });
        }
        const updateObj = req.body;
        if (name) updateObj.name = name;
        if (email) updateObj.email = email;
        if (mobile_number) updateObj.mobile_number = mobile_number;
        if (is_verified) updateObj.is_verified = is_verified;
        if (dob) updateObj.dob = dob;
        if (role) updateObj.role = role;
        if (status) updateObj.status = status;
        
        if (Object.keys(updateObj).length === 1) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 400,
                error: `Invalid field unable to update`,
                message: `Failure`
            });
        }

        if(updateObj) updateObj.updated_at = new Date();
        const userObj = await UserModel.findOneAndUpdate({ user_id: user_id }, { $set: updateObj }, { new: true }).select('-_id -__v -password').lean();
        if (!userObj) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 404,
                error: `Invalid User ID. Please Try again`,
                message: `Failue`,
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
                mobile_number: userObj.mobile_number,
                is_verified: userObj.is_verified,
                dob: userObj.dob,
                role: userObj.role,
                status: userObj.status,
                created_at: userObj.created_at,
                updated_at: userObj.updated_at,
                deleted_at: userObj.deleted_at,
            },
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

    static async deleteUser (req, res, next) {
        try {
            const { user_id } = req.body;
            const user = await UserModel.findOneAndDelete({ user_id: user_id });

            if (!user) {
              return  ResponseHandler.send(res, {
                    success: false, 
                    error: `Invalid User ID`,
                    message: `Error`, 
                    statusCode: 404
                }); 
            }
            return ResponseHandler.send(res, {
                success: true, 
                statusCode: 200,
                message: `Success`, 
                data: {
                    message: `Delete Successfully.`
                }
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

    /*static async updateUserRole( req, res, next ) {
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
            UserRole.superAdmin,
            UserRole.admin,
            UserRole.manager,
            UserRole.tipperowner,
            UserRole.truckmanager,
            UserRole.truckdriver, 
            UserRole.contentWriter,
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
    }*/

    static async getUserDetails(req, res, next) {
        try {
            const { user_id } = req.body;
            const userProfile = await UserModel.findOne({ user_id: user_id });
            return ResponseHandler.send(res, {
                success: true, 
                statusCode: 200,
                message: "Success", 
                data: {
                    user_id: userProfile.user_id,
                    name: userProfile.name,
                    email: userProfile.email,
                    mobile_number: userProfile.mobile_number,
                    is_verified: userProfile.is_verified,
                    dob: userProfile.dob,
                    role: userProfile.role,
                    status: userProfile.status,
                    created_at: userProfile.created_at,
                    updated_at: userProfile.updated_at,
                    deleted_at: userProfile.deleted_at,
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
}

module.exports = UserController;