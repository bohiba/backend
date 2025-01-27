// Model Class
const mongoose = require('mongoose');
const db = require("../config/db");
const UserRole = require('../utils/user_roles');

const { Schema } = mongoose;

const MineSchema = new Schema({
  mine_id: { type: String, required: false },
  mine_name: { type: String, required: false },
  contact_details: {
    email: { type: String, required: false },
    phone_number: { type: String, required: false },
  },
  role: {
    type: String,
    default: UserRole.minesSuperAdmin,
    enum: [ 
      UserRole.minesSuperAdmin, 
      UserRole.minesAdmin, 
      UserRole.minesManager 
    ]
  },
  mine_code: { type: String, required: false },
  category: { type: String, enum: ['COMPANY', 'INDIVIDUAL', 'FIRM'], required: true },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'CLOSED'], required: true },
  mineral: { type: String, required: false },
  name_lease: { type: String },
  location_lease: { type: String },
  mine_category: { type: String, enum: ['PRIVATE', 'GOV', 'SEMI-GOV'], required: true },
  about: { type: String },
  mine_area: { type: Number, required: false }, // in hectare
  mine_address: {
    address: { type: String, required: false },
    landmark: { type: String },
    city: { type: String, required: false },
    district: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },
    country: { type: String, required: false },
  },
  owner_name: { type: String, required: false },
  owner_address: {
    address: { type: String, required: false },
    landmark: { type: String },
    city: { type: String, required: false },
    district: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },
    country: { type: String, required: false },
  },
  
  document: {
    gst: {
      is_verified: { type: Boolean, required: false },
      gst_number: { type: String },
    },
    pan: {
      is_verified: { type: Boolean, required: false },
      pan_number: { type: String },
    },
    cin: {
      is_verified: { type: Boolean, required: false },
      cin_number: { type: String },
    },
    tin: {
      is_verified: { type: Boolean, required: false },
      tin_number: { type: String },
    },
  },
  valid_from: { type: Date, timestamps: true, required: true },
  valid_till: { type: Date, timestamps: true, required: true },
  added_by: { type: String, required: false },
  created_at: { type: Date, timestamps: true, required: false },
  update_at: { type: Date, timestamps: true, required: false, default: null },
  deleted_at: { type: Date, timestamps: true, required: false, default: null },
});

const MinesModel = db.model('mines', MineSchema);
module.exports = MinesModel;