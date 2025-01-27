const UserModel = require('../models/user_model');
const NodeMailer = require('nodemailer');


class AuthServices {

  static async verifyEmailServices() {

  }

  static async generateUniqueID({ length }) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueID;
    let isUnique = false;

    while (!isUnique) {
      uniqueID = Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join('');
      const existingUserID = await UserModel.findOne({ uniqueID });
      isUnique = !existingUserID; // If no match, it's unique
    }
    return uniqueID;
  }

  static async generateOTP() {
    const digits = "1234567890";
    let otp = "";
    let isUnique = false;
    do {
      otp = Array.from({ length: 6}, () =>
        digits.charAt(Math.floor(Math.random() * digits.length))
      ).join('');
      const existingUserID = await UserModel.findOne({ otp });
      isUnique = !existingUserID; // If no match, it's unique
    } while (!isUnique);
    return otp;
  }

  static async sendEmail({ to, subject, html }) {
    const transporter = NodeMailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      }
    });
  
    const mailOptions = {
      from: '"Bohiba Official" <bohibaofficial@gmail.com>',
      to,
      subject,
      html
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      return  {
        success: true,
        statusCode: 201,
        message: "Success", 
        
      }
    } catch (error) {
      return {
        success: false,
        statusCode: 500, 
        error: error.message,
        message: `Error while sending email`, 
      }
    }
  }
}
  
  module.exports = AuthServices;
  