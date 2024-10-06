const rateLimit = require('express-rate-limit');
//Ensures that not too many requests are passed 
//This is to prevent abuse or overuse of the API
const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 4,
    message: 'You are sending too many requests. Please slow down.',
});

module.exports = limiter;