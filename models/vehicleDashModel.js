const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
    vehicleUUID: { 
        type:String, 
    },
    vehicleNumber: { 
        type:String, 
        unique: true 
    },
    driverName: { 
        type:String, 
    },
    driverLicenseNumber: { 
        type:String, 
        unique: true 
    },
    driverMobileNumber: { 
        type:String, 
        unique: true 
    },
    vehicleWheel: { 
        type:String, 
    } 
});

const addNewVehicleSchema = new Schema ({
    userID: { 
        type:String, 
        unique: true 
    },
    allVehicles: [vehicleSchema]
});

const AddNewVehicleModel = mongoose.model('vehicels', addNewVehicleSchema);
module.exports = AddNewVehicleModel