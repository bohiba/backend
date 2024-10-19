
const VehicleRouter = require('express').Router();
const VehicleController = require('../controllers/vehicle_controller');

VehicleRouter.get(`/addVehicle`,VehicleController.addNewVehicle);

module.exports = VehicleRouter;