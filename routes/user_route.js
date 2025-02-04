const UserRouter = require(`express`).Router();
const UserController = require(`../controllers/user_controller`);
const AuthMiddleware = require('../middleware/auth_middleware');

UserRouter.get(`/all-users`, AuthMiddleware.verifyToken, UserController.getAllUser);
UserRouter.post(`/add-user`, AuthMiddleware.verifyToken, UserController.addUser);
UserRouter.put(`/update-user`, AuthMiddleware.verifyToken, UserController.updateUser);
UserRouter.get(`/profile`, AuthMiddleware.verifyToken, UserController.getUserDetails);
UserRouter.delete(`/delete-user`, AuthMiddleware.verifyToken, UserController.deleteUser);

module.exports = UserRouter