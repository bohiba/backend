// Routes
const express = require('express');
const MineRouter = express.Router();
const MineController = require('../controllers/mine_controller');
const MineMiddleware = require('../middleware/mine_middleware');
const AuthMiddleware = require("../middleware/auth_middleware");

MineRouter.post('/mines', AuthMiddleware.verifyToken, MineMiddleware.validateMineData, MineController.addMine);
MineRouter.get('/mines', AuthMiddleware.verifyToken, MineController.getMines);
MineRouter.get('/mines/:mineId', AuthMiddleware.verifyToken, MineController.getMineById);
MineRouter.put('/mines/:mineId', AuthMiddleware.verifyToken, MineMiddleware.validateMineData, MineController.updateMine);
MineRouter.delete('/mines/:mineId', AuthMiddleware.verifyToken, MineController.deleteMine);

module.exports = MineRouter;
