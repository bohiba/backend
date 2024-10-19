
const Router = require('express').Router();
const UserController = require("../controllers/user_controller");

Router.post(`/add-user`, UserController.addNewUser);
Router.post(`/login`, UserController.loginUser);
Router.post(`/logout`, UserController.logout);

module.exports = Router;