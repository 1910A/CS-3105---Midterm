const users = require('../data/users.json');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mysecretkey';

//Handle user registration
exports.register = (req, res) => {
    const { username, password, email } = req.body;

    //Checks if any important information is missing
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Some fields are missing. Please fill them up.' });
    }

    //Checks if user details that were input already exist
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    //Create new user
    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };

    users.push(newUser);
    res.status(201).json({ message: 'User is now registered', user: newUser });
};


//Handle user login 
exports.login = (req, res) => {
    const { email, password } = req.body;

    //Checks if any important information are missing
    if (!email || !password) {
        return res.status(400).json({ message: 'Please type in your email and password.' });
    }

    //If values are incorrect, returns message to notify user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    //Creates a token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

    res.status(200).json({ message: 'Login successful', token });
};

//Handle Profile Retrieving
exports.getProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    //If credentials are not in db, notify user 
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profile: user });
};