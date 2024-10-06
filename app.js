const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const rateLimiter = require('./middleware/rateLimit');
const logging = require('./middleware/logging');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware that allows server to handle JSON data sent in requests
app.use(bodyParser.json());

//Middleware for logging
app.use((req, res, next) => {
    const currentDate = new Date().toISOString();
    console.log(`[${currentDate}] ${req.method} ${req.originalUrl}`); 
    next();
});

//Middleware for rate-limiting
app.use(rateLimiter); 
app.use(logging);
app.get('/', (req, res) => {
    res.json({ message: 'Backend Application' });
});
app.use('/api/users', userRoutes);

//Handles errors
app.use((req, res) => {
    res.status(404).json({ message: 'Route is not found' });
});

//Starts the express server
app.listen(PORT, () => {
    console.log(`Server connected to ${PORT}`);
});