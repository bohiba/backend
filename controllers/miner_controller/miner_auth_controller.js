const { json } = require('body-parser');
const MinerAuthMiddleware = require('../../middleware/miner/miner_auth_middleware');
const MinerAuthModel = require('../../models/miner_models/miner_auth_model');
require('dotenv').config();

// [minerLogin] method helps to login gives access to whole backend part of the system
async function minerLogin(req, res, next) {
    try {
        const { miner_id, password } = req.body;
        const existingMiner = await MinerAuthMiddleware.loginMiner(miner_id);
        
        if(!existingMiner) {
            return res.status(401).json({
                successCode: 401, 
                success: false, 
                body: "Miner not found. Please contact us!"
            });
        }

        const isPasswordMatched = await existingMiner.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                successCode: 401, 
                success: false, 
                body: "Password is incorrect"
            });
        }

        let tokenData = {_id: existingMiner._id, miner_id: existingMiner.miner_id};
        const token = await MinerAuthMiddleware.generateToken(tokenData, process.env.SECRET_KEY, "72h");

        req.session.miner = {
            _id: existingMiner._id,
            miner_id: existingMiner.miner_id,
            email: existingMiner.email,
            mobile_number: existingMiner.mobile_number
        };
        console.log("User data stored in session:", req.session.miner);

        res.status(200).json({
            successCode: 200, 
            success: true, 
            token: token, 
            body: req.session.miner
        }); 

    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: `Error While SignIn ${error}`
        })
    }
}


// helps to create/add miner
async function addNewMiner(req, res, next) {
    try {
        async function generateUniqueID() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let uniqueID = '';
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueID += characters.charAt(randomIndex);
            }
    
            const existingUserID = await MinerAuthModel.findOne({ uniqueID });
            if (existingUserID) {
                return generateUniqueID();
            }
            return uniqueID;
        }

        const {company_name, email, mobile_number, password} = req.body;

        console.log(`\n=======================\n| Request Data ${company_name}, ${email}, ${mobile_number}, ${password} |\n=======================\n`);
        
        const existingMiner = await MinerAuthModel.findOne({ $or: [{ email }, { mobile_number }] });

        if (existingMiner &&  existingMiner.email) {
            return res.status(400).json({
                successCode: 400, 
                success: false, 
                body:'Miner with this email already exist.'
            });
        }
        if (existingMiner && existingMiner.mobile_number) {
            return res.status(400).json({
                successCode: 400, 
                success: false, 
                body:'Miner with this Mobile No already exist.'
            });
        }
        const miner_id = await generateUniqueID();
        const response = await MinerAuthMiddleware.loginMiner(miner_id);
        console.log(`Add Miner API: ${response}`);

        return res.status(200).json({
            successCode: 200,
            success: true, 
            body: response,
        });  

    } catch (error) {
        res.status(401).json({
            successCode: 401, 
            success: false, 
            body: error,
            message: "Something went wrong."
        },);   
    }
}


module.exports = {
    addNewMiner,
    minerLogin
}