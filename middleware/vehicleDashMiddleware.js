const AddNewVehicleModel = require('../models/vehicleDashModel');

class VehicleDashService{
    static async addNewVehicle(userID, vehicleData) {
        try {
            let checkUser = await AddNewVehicleModel.findOne({userID});
            
            if (!checkUser) {
                checkUser = new AddNewVehicleModel({ userID , allVehicles: [ ] });
            }
            
            const existingVehicle = checkUser.allVehicles.some((vehicle) => {
                return (vehicle.vehicleNumber == vehicleData.vehicleNumber)
            });
            
            if (existingVehicle) {
                console.log(existingVehicle.toString());
                return {
                    statusCode: 404,
                    success: false,
                    body: {
                        message: 'Vehicle is already registered.'
                    }
                }
            }
            checkUser.allVehicles.push(...vehicleData);
            await checkUser.save();
            
            return {
                message: 'Vehicle added successfully',
            };    
        } catch (error) {
            return {
                statusCode: 500,
                status: true,
                message: error
            }
        }
    }
}

module.exports = VehicleDashService;