
const UserMiddleware = require("../middleware/user_middleware");
const { logger } = require("../utils/logger");

class UserController {
  static async addNewUser(req, res) {
    const { email, mobile_number, password, roles, createdBy } = req.body;
    const token = req.headers.authorization;
    var response = await UserMiddleware.addUser({
      email: email,
      mobile_number: mobile_number,
      password: password,
      roles: roles,
      createdBy: createdBy,
    });
    if (response.success) {
      res.status(response.code).json({
        code: response.code,
        success: response.success,
        data: response.data,
      });
    } else {
      res.status(response.code).json({
        code: response.code,
        success: response.success,
        error: {
          message: response.error.message,
        },
      });
    }
  }

  static async loginUser(req, res) {
     const { user_id, password } = req.body;
     if (user_id === undefined) {
      res.status(204).json({
        code: 204,
        success: false,
        error: {
          message: `userid cannot be empty`
        }
      });
     } else if(password === undefined) {
      logger({ text: `Password: ${password}`})
      res.status(204).json({
        code: 204,
        success: false,
        error: {
          message: `password cannot be empty`
        }
      });
     } else {
      let strUserID = user_id.split(` `).join(``);
      let strPassword = password.split(` `).join(``);
      var response = await UserMiddleware.loginMiddleware({ user_id: strUserID, password: strPassword });
      if (response.success) {
        res.status(response.code).json({
          code: response.code,
          success: response.success,
          data: response.data,
        });
      } else {
        res.status(response.code).json({
          code: response.code,
          success: response.success,
          error: {
            message: response.error.message
          },
        });
      }  
     }
  }

  
  static logout(req, res) {
    const token = req.headers.authorization;
    console.log(`${token}`);
    if (token !== null || token !== undefined) {
      logger({ text: token })
      UserMiddleware.blackListToken({ token: token });
      var response = UserMiddleware.isTokenBlackList({ token: token });
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        error: {
          message: response.error.message,
        }
      });
    } else {
      return res.status().json({
        error:  `Invalid token`
      })
    } 
  }
}

module.exports = UserController;
