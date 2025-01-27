const UserRouter = require(`express`).Router();
const UserController = require(`../controllers/user_controller`);
const AuthMiddleware = require('../middleware/auth_middleware');

UserRouter.put('/role', AuthMiddleware.verifyToken, UserController.updateRole);

module.exports = UserRouter