// Controller
const MineModel = require("../models/mines_model");
const ResponseHandler = require("../services/response_handler")
const { GlobalServices , IDType } = require("../services/global_serivces");

class MineController {
  // Get all mines
  static async getMines(req, res) {
    try {
      const mines = await MineModel.find().select(`-_id -__v`).lean();
      return ResponseHandler.send(res, {
        success: true,
        statusCode: 200,
        message: `Successfull`,
        data: mines,
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

  // Get mine by ID
  static async getMineById(req, res) {
    try {
      const mine = await MineModel.findOne({ mine_id: req.params.mineId});
      if (!mine) {
        return ResponseHandler.send( res,{ 
          success: true,
          statusCode: 200,
          message: `Mine not found. Invalid mine id.`,
          data: mine
        });
      }
      return ResponseHandler.send( res,{ 
        success: true,
        statusCode: 200,
        message: `Successfull`,
        data: mine
      });
    } catch (error) {
      return ResponseHandler.send(res, {
        success: false,
        statusCode: 500,
        error: error.message,
        message: `Internal server error`,
      });
    }
  }

  // Add a new mine
  static async addMine(req, res) {
    try {
      const mineID = await GlobalServices.generateUniqueID({ type: IDType.MINES_ID });
      const mineObj = new MineModel({
        mine_id: mineID,
        ...req.body,
      });
      const savedMine = await mineObj.save();
      return ResponseHandler.send(res, {
        success: true,
        statusCode: 201,
        message: `Mines created successfully.`,
        data: savedMine,
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

  // Update mine by ID
  static async updateMine(req, res) {
    try {
      req.body.update_at = Date.now();
      const updatedMine = await MineModel.findOneAndUpdate({ mine_id: req.params.mineId}, req.body, { new: true });
      if (!updatedMine) {
        return  ResponseHandler.send(res, {
          success: false,
          statusCode: 404,
          message: "Mine not found. Invalid Mine ID"
        });
        
      } else {
        return  ResponseHandler.send(res, {
          success: true,
          statusCode: 200,
          message: "Sucessfull",
          data: updatedMine
        });
      }
    } catch (error) {
      return  ResponseHandler.send(res, {
        success: false,
        statusCode: 500,
        error: error.message,
        message: "Internal server failure",
      });
    }
  }

  // Delete mine by ID
  static async deleteMine(req, res) {
    try {
      const deletedMine = await MineModel.findOneAndDelete({ mine_id: req.params.mineId });
      if (!deletedMine) {
        return  ResponseHandler.send(res, {
          success: false,
          statusCode: 404,
          message: "Mine not found. Invalid Mine ID"
        });
      } else {
        return  ResponseHandler.send(res, {
          success: true,
          statusCode: 200,
          message: "Mine deleted succesfully",
        });
      }
    } catch (error) {
      return  ResponseHandler.send(res, {
        success: false,
        statusCode: 500,
        error: error.message,
        message: "Internal server failure",
      });
    }
  }
}

module.exports = MineController;
