const router = require('express').Router();
const VehicleDashController = require('../controllers/vehicleDashController');

router.post('/add-vehicle', VehicleDashController.addNewVehicle);
module.exports = router;