
const VehicleModel = require(`../models/vehicle_model`);
const ResponseHandler = require(`../services/response_handler`);

class VehicleController {
    static async getAllVehicle( req, res, next ) {
      try {
        const getAllVehicle = await VehicleModel.find().select('-_id -__v').lean();
        return ResponseHandler.send(res, {
          success: true,
          statusCode: 200,
          message: `Successfull`,
          data: getAllVehicle,
        });
      } catch (error) {
        return ResponseHandler.send(res, {
          success: false,
          statusCode: 500,
          error: error.message,
          message: `Internal Server Error`,
        });
    }
    }

    static async getVehicleDetail( req, res, next) {
      try {
        const { vehicle_id }  = req.body;
        
        const reqObj = await VehicleModel.findOne({ vehicle_id: vehicle_id }).select('-_id -__v').lean();;
        if (!reqObj) {
          return ResponseHandler.send( res,{ 
            success: true,
            statusCode: 200,
            error: `Invalid Vehicle Id.`,
            message: `Error`
          });
        }

        return ResponseHandler.send( res,{ 
          success: true,
          statusCode: 200,
          message: `Successfull`,
          data: newsObj
        });
      } catch (error) {
        return ResponseHandler.send(res, {
          success: false,
          statusCode: 500,
          error: error.message,
          message: `Internal Server Error`,
        });
      }
    }

    // TODO
    static async addVehicle( req, res, next ) {
      try {
        const { user_id, added_by, vehicle_no, engine_no, chassis_no } = req.body;
        // Make a api request
        // Verify the success response with engine_no, chassis_no and vehcile_no with engineNo, chassisNo and registrationNumber respectively. if matched store the data as per VehicleModel
      } catch (error) {
        return ResponseHandler.send(res, {
          success: false,
          statusCode: 500,
          error: error.message,
          message: `Internal Server Error`,
        });
      }
    }

    static async updateVehicle( req, res, next ) {
      try {
        const { vehicle_id, user_id, manager_id, driver_id, is_fav, is_shared } = req.body
        if (!user_id || !vehicle_id) {
          return ResponseHandler.send(res, {
            success: false,
            statusCode: 400,
            error: `User ID and Vehicle ID are required.`,
            message: 'Failure',
          });
        }

        const reqObj = req.body;
        if(user_id) reqObj.user_id = user_id;
        if(manager_id) reqObj.manager_id = manager_id;
        if(driver_id) reqObj.driver_id = driver_id;
        if(is_fav) reqObj.is_fav = is_fav;
        if(is_shared) reqObj.is_shared = is_shared;
        if (Object.keys(reqObj).length === 2) {
          return ResponseHandler.send(res, {
            success: false,
            statusCode: 400,
            error: `Invalid field unable to update`,
            message: `Failure`
          });
        }

        if(reqObj) reqObj.updated_at = Date.now;
        const updatedVehicleObj = await VehicleModel.findOneAndUpdate({ vehicle_id: vehicle_id }, { $set: reqObj }, { new: true }).select('-_id -__v').lean();
        if (!updatedVehicleObj) {
          return ResponseHandler.send(res, {
            success: false,
            statusCode: 404,
            error: `Invalid News ID. Please Try again`,
            message: `Failue`,
          });
        }

        return ResponseHandler.send(res, {
          success: true,
          statusCode: 200,
          message: `Success`,
          data: {
            vehicle_id: vehicle_id,
            user_id: updatedVehicleObj.user_id,
            manager_id: updatedVehicleObj.manager_id,
            driver_id: updatedVehicleObj.driver_id,
            is_fav: updatedVehicleObj.is_fav,
            is_shared: updatedVehicleObj.is_shared,
            owner_info: updatedVehicleObj.owner_info,
            vehicle_info: updatedVehicleObj.vehicle_info,
            document_info: updatedVehicleObj.document_info,
            permit_info: updatedVehicleObj.permit_info,
            created_at: updatedVehicleObj.created_at,
            updated_at: updatedVehicleObj.updated_at,
            deleted_at: updatedVehicleObj.deleted_at,
          },
        });

      } catch (error) {
        return ResponseHandler.send(res, {
          success: false,
          statusCode: 500,
          error: error.message,
          message: `Internal Server Error`,
        });
      }
    }

    static async deleteVehicle( req, res, next ) {
      try {
        const { vehicle_id } = req.body
        const reqObj = await VehicleModel.findOneAndDelete({ vehicle_id: vehicle_id });

        if (!reqObj) {
          return  ResponseHandler.send(res, {
            success: false, 
            error: `Invalid Vehicle ID`,
            message: `Error`, 
            statusCode: 404
          }); 
        }

        return ResponseHandler.send(res, {
          success: true, 
          statusCode: 200,
          message: `Success`, 
          data: {
            message: `News Delete Successfully.`
          }
        });
      } catch (error) {
        return ResponseHandler.send(res, {
          success: false,
          statusCode: 500,
          error: error.message,
          message: `Internal Server Error`,
        });
      }
    }
}

module.exports = VehicleController;