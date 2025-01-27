const Router = require('express').Router();
const AuthController = require('../controllers/auth_controller');
const AuthMiddleware = require('../middleware/auth_middleware');

Router.post("/signup", AuthController.signUp)
Router.post('/verify-otp', AuthController.verifyOtp);
Router.post('/signin', AuthController.signIn);
Router.post('/logout', AuthController.logOut);
Router.post('/forgot-password', AuthMiddleware.verifyToken, AuthController.forgotPassword);
Router.post('/reset-password', AuthMiddleware.verifyToken, AuthController.resetPassword);
Router.get('/profile', AuthMiddleware.verifyToken, AuthController.getProfile);

module.exports = Router;