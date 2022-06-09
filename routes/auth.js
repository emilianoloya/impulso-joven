//Import dependecies
const router = require('express').Router();
const { error } = require('@hapi/joi/lib/base');
const bcrypt = require('bcryptjs');

// Import Models
const User = require("../models/User");

//Import validation Functions
const { registerValidation } = require('../validation');

//GET Auth Routes
router.get('/register', (req, res) => {
    res.render('register.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});


//Post register information to database
router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email already registered");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const savedUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        res.send(savedUser);
    }catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
