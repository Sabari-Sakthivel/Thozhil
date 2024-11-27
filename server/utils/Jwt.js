const jwt = require('jsonwebtoken');


const generateToken= ( id , role) => {
    return jwt.sign ({id,role}, 'your_secret_key', {expiresIn: "10min"});

};

const verifyToken = (token)=>{
    try {
        return jwt.verify(token, ' your_secret_key');
    } catch (error) {
        return null;
    }
};
module.exports = { generateToken, verifyToken};