const NewsRouter = require('express').Router();
const AuthMiddleware = require('../middleware/auth_middleware');
const NewsController = require(`../controllers/news_controller`);

NewsRouter.get(`/all-news`, AuthMiddleware.verifyToken, NewsController.gettAllNews)
NewsRouter.delete(`/delete-news`, AuthMiddleware.verifyToken, NewsController.deleteNews)