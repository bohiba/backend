const MinerAuthModel = require('../../models/miner_models/miner_auth_model');

class MinerAuthMiddleware {
    static async createMiner (miner_id, company_name, email, password){
        try {
            const createUser = new MinerAuthMiddleware({miner_id, company_name, email, password});
            console.log(`\n====================\n|Create User: ${createUser.company_name}|\n====================\n`);
            return await createUser.save();
        } catch (error) {
            console.log(`Error occurred while creating Miner\n${error}`);
        }
    }

    static async loginMiner(miner_id) {
        return await MinerAuthModel.findOne({miner_id});   
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }

    static async verifyToken(req, res, next) {
        const token = req.cookies.token || '';
        if (!token) {
            return res.status(401).json({
                successCode: 401,
                success: false,
                body: 'No token provided',
            },);
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    successCode: 401,
                    success: false,
                    message: 'Failed to authenticate token',
                });
            }
            
            req.miner_id = decoded.miner_id;
            next();
        });
    }
};

module.exports = MinerAuthMiddleware;
