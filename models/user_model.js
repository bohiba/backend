/// user_id is unique for each user
/// User can modify their profile details such as email, mobile_number, password, role, address, bank

const db = require('../config/db');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserRole = require('../utils/user_roles');
const UserStatus = require(`../utils/user_status`);

const { Schema } = mongoose;
const UserSchema = new Schema({
  user_id: { type: String, unique: true, required: true, index: true }, // Ensured required
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  mobile_number: { type: String, unique: true, required: true },
  
  is_verified: { type: Boolean, default: false },

  dob: { type: Date },

  role: {
    type: String,
    enum: ["tipperowner", "tipperdriver", "tippermanager" ,"admin", "superadmmin"], // Avoiding external dependencies
    default: "tipperowner",
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  password: { type: String, required: true }, // Ensuring required password
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

// **Indexing for faster queries**
UserSchema.index({ user_id: 1, email: 1, mobile_number: 1 }, { unique: true });
UserSchema.index({ status: 1, role: 1 }); // Optimized filtering

// **Pre-Save Hook for Password Hashing**
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Avoid rehashing if password is unchanged
  
  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// **Compare Password Method**
UserSchema.methods.comparePassword = function (userPassword) {
  return bcrypt.compareSync(userPassword, this.password);
};

const UserModel = db.model('users', UserSchema);
module.exports = UserModel;
