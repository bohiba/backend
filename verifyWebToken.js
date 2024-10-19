const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyWebToken = (req, res, next) => {
    const tokenHeader = req.header('authorization');
    const secretKey = process.env.SECRET_KEY;
    const token = tokenHeader.replace('Bearer ','')
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {

        if (err) {
          return res.status(403).json({ 
            statusCode: 403,
            status: false,
            token: token,
            error: err
        });
        }
        req.user = decoded;
        next();
      });   
}