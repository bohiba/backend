
const UserModel = require("../models/user_models");
const UserRoles = require("../utils/roles");

async function generateUniqueID({ roles }) {

    return new Promise(async (resolve, reject) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uniqueID = '';
        let length = 0;
        switch (roles) {
            case  UserRoles.superAdmin:
                length = 8;
                break;
            case UserRoles.admin:
                length = 8;
                break;
            case UserRoles.contentAdmin:
                length = 8;
                break;
            case UserRoles.contentWriter:
                length = 8;
                break;        
            case UserRoles.tipperOwner:
                length =  6   
                break;
            case UserRoles.driver:
                length =  6   
                break;    
            default:
                break;
        }
      
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueID += characters.charAt(randomIndex);
        }

        try {
            const existingUserID = await UserModel.findOne({ uniqueID });
            if (existingUserID) {
                resolve(await generateUniqueID({ roles }),
            );
            } else {
                resolve(uniqueID);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    generateUniqueID,
}

