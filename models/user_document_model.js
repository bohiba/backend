const db = require('../config/db');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const DocumentSchema = new Schema({
    user_id: { type: String, unique: true, required: true, index: true }, // Foreign Key linking to User
  
    document: {
      driving_license: {
        is_verified: { 
            type: Boolean, 
            default: false 
        },
        dl_number: { 
            type: String, 
            unique: true, 
            sparse: true 
        },
      },
      aadhaar: {
        is_verified: { 
            type: Boolean, 
            default: false 
        },
        aadhaarNumber: { 
            type: String, 
            unique: true, 
            sparse: true, 
            length: 16, 
            default: null 
        },
      },
      pan: {
        is_verified: { 
            type: Boolean, 
            default: false 
        },
        panNumber: { 
            type: String, 
            unique: true, 
            sparse: true, 
            maxlength: 19, 
            default: null 
        },
      },
    },
  
    address: {
        is_verified: { 
            type: Boolean, 
            default: false 
        },
        addressProof: { 
            type: String, 
            default: null 
        },
        houseNumber: { 
            type: String, 
            default: null 
        },
        locality: { 
            type: String, 
            default: null 
        },
        streetAddress: { 
            type: String, 
            default: null 
        },
        village: { 
            type: String, 
            default: null 
        },
        pinCode: { 
            type: String, 
            maxlength: 6, 
            default: null 
        },
        district: { 
            type: String, 
            default: null 
        },
        state: { 
            type: String, 
            default: null 
        },
        country: { 
            type: String, 
            default: null 
        },
    },
  
    bank: [
      {
        bankName: { type: String },
        accountNumber: { type: String, unique: true, sparse: true },
        ifsc: { type: String, maxlength: 11 },
      },
    ],
  
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  });
  
  // Indexing for Performance
  DocumentSchema.index({ user_id: 1, "document.aadhaar.aadhaarNumber": 1, "document.pan.panNumber": 1 });
  
  const UserDocumentModel = db.model("user document", DocumentSchema);
  module.exports = UserDocumentModel;

  