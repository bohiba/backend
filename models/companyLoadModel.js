const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const consigneeDetails = new Schema ({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    postedAt: {
        type: Date,
        required: true,
    },
    permitNumber: {
        type: String,
        required: true,
        unique: true
    },
    consigneeName: {
        type: String,
        required: true,
    },
    transportPrice: {
        type: String,
        required: true,
    },
    mineralName: {
        type: String,
        required: true,
    },
    mineralType: {
        type: String,
        required: true,
    },
    transporterName: {
        type: String,
        required: true,
    },
    driverBonus: {
        type: Number,
        required: true,
    },
    fuelBonus: {
        type: Number,
        required: true,
    },
    consigneeAddress: {
        type: String,
        required: true,
    },
});

const companyLoadSchema = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: true,  
    },
    consignerName: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,   
    },
    consigneeLogo: {
        type: String,
        required: true,
        unique: true,
    },
    consignerLocation: {
        type: String,
        required: true,
        unique: true,
    },
    consigneeDetails: [consigneeDetails]
});

const CompanyLoadModel = db.model('loads', companyLoadSchema);

module.exports = CompanyLoadModel;
