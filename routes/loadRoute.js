const router = require('express').Router();
const GetAvailableLoadController = require('../controllers/companyLoadController');

router.get('/availableload', GetAvailableLoadController.getAllAvailableLoad);

module.exports = router;