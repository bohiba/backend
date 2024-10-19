const mongoose = require('mongoose');
const db = require('../../config/db')
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const minerLoginSchema = new Schema({
    miner_id: {
        length: 6,
        type: String,
        required: true,
        unique: true,
    },
    company_logo: {
        type: String,
        required: false,
    },
    company_name: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: String,
    },
    email: {
        type: String,
    },
    gst_number: {
        type: String,
        required: false,
    },
    pan_number: {
        type: String,
        required: false,
    },
    cin_number: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        default: "bohiba@1234"
    }
});

minerLoginSchema.pre('save', async function () {
    try {
        var miner = this;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(miner.password, salt);
        user.password = hashPassword;
    } catch (error) {
        console.log(error);
    }
});

minerLoginSchema.methods.comparePassword = async function (minerPassword) {
    try {
        const isMatch = await bcrypt.compare(minerPassword, this.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

const MinerAuthModel = db.model('miners', minerLoginSchema);
module.exports = MinerAuthModel;
