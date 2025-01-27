/// user_id is unique for each user
/// User can modify their profile details such as email, mobile_number, password, role, address, bank

const db = require('../config/db');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const UserRole = require('../utils/roles');

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
  user_name: {
    type: String,
    require: false,
  },
  mobile_number: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    default: null,
  },
  is_verified : {
    type: Boolean,
    default: false,
    required: false,
  },
  otp: {
    type: String,
    require: false,
    length: 6,
  },
  password: {
    type: String,
    require: false,
  },
  role: {
    type: String,
    default: UserRole.tipperowner,
    enum: [
      UserRole.tipperowner,
      UserRole.truckdriver,
      UserRole.truckmanager,
    ],   
    required: false,
  },
  document: {
    driving_liecense: {
      is_verified: {
        type: Boolean,
        default: false
      },
      dl_number: {
        type: String,
        required: false,
      },
    },
    aadhaar: {
      is_verified: {
        type: Boolean,
        require: false,
        default: false,
      },
      aadhaarNumber: {
        type: String,
        require: false,
        maxlength: 19,
        default: null,
      },
    },
    pan: {
      is_verified: {
        type: Boolean,
        require: false,
        default: false,
      },
      panNumber: {
        type: String,
        require: false,
        maxlength: 19,
        default: null,
      },
    },
  },

  address : {
    is_verified: {
      type: Boolean,
      require: false,
      default: false,
    },
    addressProof: {
      type: String,
      require: false,
      default: null,
    },
    houseNumber: {
      type: String,
      require: false,
      default: null,
    },
    locality: {
      type: String,
      require: false,
      default: null,
    },
    streetAddress: {
      type: String,
      require: false,
      default: null,
    },
    village: {
      type: String,
      require: false,
      default: null,
    },
    pinCode: {
      type: String,
      maxlength: 6,
      require: false,
      default: null,
    },
    district: {
      type: String,
      require: false,
      default: null,
    },
    state: {
      type: String,
      require: false,
      default: null,
    },
    country: {
      type: String,
      require: false,
      default: null
    },
  },
  bank: [{
    bankName: {
      type: String,
      require: false,
    },
    accountNumber: {
      type: String,
      require: false,
    },
    ifsc: {
      type: String,
      require: false,
      maxlength: 11,
    }
  }],
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
    default: null,
  },
  deleted_at: {
    type: Date,
    required: false,
    default: null,
  }
});

userSchema.pre('save', async function() {
  try {
      var user = this;
      const salt = await bcrypt.genSalt(10);
      const hashPwd = await bcrypt.hash(user.password, salt);
      user.password = hashPwd;
  } catch (error) {
      console.log(error)   
  }
});

userSchema.methods.comparePassword = async function(userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(`Error while Comparing Password ${error}`);
  }
}

const UserModel = db.model('users', userSchema);
module.exports = UserModel;
