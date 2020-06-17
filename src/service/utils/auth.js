const config = require('../../config');
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
    return jwt.sign(data, config.SECRET_KEY, {expiresIn: '1d'});
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, config.SECRET_KEY);
}

exports.authorize = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token) {
        res.status(401).json({
            message: "Authentication failed!"
        });
    } else{
        jwt.verify(token, config.SECRET_KEY, (error, decode) => {
            if(error) {
                res.status(401).json({
                    message: "Authentication failed!"
                });
            } else {
                next();
            }
        });
    }
    return jwt.sign({token: token}, config.SECRET_KEY, {expiresIn: '6h'});
}