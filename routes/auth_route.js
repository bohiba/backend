const Router = require('express').Router();
const AuthMiddleware = require('../middleware/auth_middleware');
const AuthController = require('../controllers/auth_controller');


Router.post(`/signup`, AuthController.signUp)
Router.post(`/verify-otp`,AuthMiddleware.verifyToken, AuthController.verifyOtp);
Router.post(`/signin`, AuthController.signIn);
Router.post(`/logout`, AuthController.logOut);
Router.post(`/forgot-password`, AuthMiddleware.verifyToken, AuthController.forgotPassword);
Router.post(`/reset-password`, AuthMiddleware.verifyToken, AuthController.resetPassword);

module.exports = Router;