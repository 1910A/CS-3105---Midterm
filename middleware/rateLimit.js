const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 4,
    message: 'You are sending too many requests. Please slow down.',
});

module.exports = limiter;