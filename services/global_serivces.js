const MinesModel = require('../models/mines_model');
const UserModel = require('../models/user_model');

class GlobalServices {
  static async generateUniqueID({ type }) {
    let characters, length;
    let uniqueID, isUnique = false;
  
    // Assign characters and length based on type
    switch (type) {
      case IDType.SUPERADMIN:
      case IDType.ADMIN:
      case IDType.TRANSPORT_OWNER:
      case IDType.TIPPER_DRIVER:
      case IDType.TIPPER_MANAGER:
      case IDType.MINES_ID:
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        length = type === IDType.MINES_ID ? 10 : 6;
        break;

      case IDType.VEHICLE_ID:
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        length = 10;
        break;

      case IDType.PASSWORD:
        characters = "ABCDEFGHIJKLMNOqwertyuiopasdfghjklzxcvbnm!@#$%^&*_+<>?:\"PQRSTUVWXYZ0123456789";
        length = 9;
        uniqueID = Array.from({ length }, () =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        ).join(""); 
        
        return uniqueID; // No need to check uniqueness for passwords
      case IDType.OTP:
        characters = "0123456789";
        length = 6;
        
        break;
      default:
        throw new Error("Invalid ID type");
    }
  
    
  
    while (!isUnique) {
      uniqueID = Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");
  
      let existingUserID;
      if (type === IDType.MINES_ID) {
        existingUserID = await MinesModel.findOne({ uniqueID });
      } else if (type === IDType.OTP) {
        existingUserID = await UserModel.findOne({ otp: uniqueID });
      } else {
        existingUserID = await UserModel.findOne({ user_id: uniqueID });
      }
  
      isUnique = !existingUserID; // Ensures uniqueness
    }
  
    return uniqueID;
  }
  
}

const IDType = Object.freeze({
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  TRANSPORT_OWNER: "transportowner",
  TIPPER_DRIVER: "tipperdriver",
  TIPPER_MANAGER: "tippermanager",
  VEHICLE_ID: `vehicleID`,
  PASSWORD: "password",
  ALL_USER: "alluser",
  MINES_ID: "minesID",
  NEWS_ID: `newsID`,
  OTP: `otp`
});

module.exports = { GlobalServices, IDType }