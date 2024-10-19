const VehicleMiddleware = require('../middleware/vehicle_middleware');
const DriverMiddleware = require('../middleware/driver_middleware');
const { logger } = require('../utils/logger');
const { response } = require('express');

class VehicleController {
    static async addNewVehicle(req, res) {
    /*Step: 1 (Get Vehcile Details)*/
    const { vehicleNumber, driverName, dob, licenseNumber, mobileNumber, wheel} = req.body;
    let vehicleResObject = await VehicleMiddleware.getVehicleDetails({vehicleNumber: vehicleNumber});
    /*Step: 2 (Get Driver Details)*/
    let driverResObject = DriverMiddleware.getDriverDetails({ licenseNumber: licenseNumber, dob: dob,}); 
    /*Step: 3 (Check Response) */
    console.log(vehicleResObject);
    console.log(driverResObject);
    /*Step: 4 (Add detail to vechile & driver DB)*/
    
    /*Step: 5 (Return response)*/
    if ((driverResObject.code == 200)) {
        return res.status(200).json({
            code: 200,
            success: true,
            message: {
                vehicleDetails: vehicleResObject.vehicleDetails,
                driveDetails: driverResObject.driveDetails
            }
        });
    }
    }
}

module.exports = VehicleController;
