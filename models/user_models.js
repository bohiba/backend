const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
    user_id:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: String,
    },
    password: {
        type: String,
        required: false,
    },
    roles: {
        type: String,
        required: false,
    },
    createdBy: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
        timestamps: true,
    }
});

const UserModel = db.model('users', userSchema);
module.exports = UserModel