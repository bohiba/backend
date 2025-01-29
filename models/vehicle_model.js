const db = require('../config/db');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const vehicleSchema = new Schema({
    vehicle_id: {
        type: String,
        required: false,
    },
    /**
         * - It store user id of the user the vehicle has been added/approved. 
         * - It stores the user id of tipper owner
         */
    user_id: {
        type: String,
        required: false,
    },
    /**
     * - It store user id of the user the vehicle has been added. 
     * - It store the user id of tipper manager.
     * - If no manager found it store null. 
     */
    manager_id: {
        type: String,
        required: false,
    },
    /**
     * - It store user id of the driver.
     * - If no driver_id is found it store null. 
     */
    driver_id: {
        type: String,
        required: false,
    },
    owner_info: {
        rc_no: {
            type: String,
            required: false,
        },
        rc_owner_name: {
            type: String,
            required: false,
        },
        rc_status: {
            type: String,
            required: false,
        },
        registered_at: {
            type: Date,
            required: false,
        },
        /**
         * - This is vehicle weight without any load.
         * - Weight is measured in Tonne
         */
        unloaded_weight: {
            type: String,
            required: false,
        },
        ownership: {
            type: String,
            required: false,
        },
        
    },
    vehicle_info: {
        model_name: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: false,
        },
        cov: {
            type: String,
            required: false,
        },
        fuel_type: {
            type: String,
            required: false,
        },
        engine_no: {
            type: String,
            required: false,
        },
        chassis_no: {
            type: String,
            required: false
        },
        manufactured_at: {
            type: Date,
            required: false,
        },
    },
    document_info: {
        pucc_upto: {
            type: Date,
            required: false,
        },
        insurance_upto: {
            type: Date,
            required: false,
        },
        fitness_upto: {
            type: Date,
            required: false,
        },
        tax_upto: {
            type: Date,
            required: false,
        },
    },
    permit_info: {
        permit_no: {
            type: String,
            required: false
        },
        permit_type: {
            type: String,
            required: false
        },
        valid_from: {
            type: Date,
            required: false,
        },
        valid_till: {
            type: Date,
            required: false,
        },
    },
    is_fav: {
        type: Boolean,
        required: false,
        default: false,
    },
    is_shared: {
        type: Boolean,
        required: false,
        default: false,
    },
    created_at: {
        type: Date,
        required: false,
    },
    updated_at: {
        type: Date,
        required: false,
    },
    delete_at: {
        type: Date,
        required: false,
    },
});

const VehicleModel = db.collection(`vehicles`, vehicleSchema);
module.exports = VehicleModel;
