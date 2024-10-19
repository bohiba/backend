const Router = require('express').Router();
const MinerAuthController = require('../../controllers/miner_controller/miner_auth_controller');

Router.get('/add-miner', MinerAuthController.addNewMiner);
Router.post('/miner-login', MinerAuthController.minerLogin);

module.exports = Router;