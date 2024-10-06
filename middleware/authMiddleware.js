const jwt = require('jsonwebtoken');


const JWT_SECRET = 'mysecretkey';


//Middleware Function
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    //Checks if there is a token
    if (!token) {
        return res.status(403).json({ message: 'No token provided, authorization denied.' });
    }

    //Checks if provided token is valid
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};