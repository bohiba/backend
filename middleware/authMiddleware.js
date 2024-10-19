const UserSignUpModel = require('../models/user_models/user_model');
const jwt = require('jsonwebtoken');

class AuthMiddleware {
    static async registerUser(userID, email, mobileNumber, password) {
        try {
            const registerUser = new UserSignUpModel({userID, email, mobileNumber, password});
            return await registerUser.save();
        } catch (error) {
            console.log(`User registration while saving\nError: ${error}`);
        }
    }

    static async signIn(userID) {
       return await UserSignUpModel.findOne({userID});
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }

    static async verifyToken(req, res, next) {
        const token = req.cookies.token || '';
        if (!token) {
            return res.status(401).json({
                successCode: 401,
                success: false,
                body: 'No token provided',
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    successCode: 401,
                    success: false,
                    message: 'Failed to authenticate token',
                });
            }
            
            req.userID = decoded.userID;
            next();
        });
    }
};

module.exports = AuthMiddleware;