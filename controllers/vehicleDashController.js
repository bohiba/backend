const VehicleDashService = require('../middleware/vehicleDashMiddleware');

async function addNewVehicle( req, res, next ) {

    try {
        const { userID, allVehicles } = req.body;
        console.log(userID, allVehicles)
        const response = await VehicleDashService.addNewVehicle(userID, allVehicles);
        console.log(response.message);

        if (response.success) {
            return res.status(200).json({
                statusCode: 200,
                    success: true,
                    message: 'Vehicle added successfully',
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                body: {
                    message: 'Failure in controller'
                }
            });
        }
    } catch (error) {
        res.status(500).json({status: false, error: error});
    }
}

module.exports = {
    addNewVehicle,
}