//Import dependecies
const router = require('express').Router();
const bcrypt = require('bcryptjs');

// Import Models
const User = require("../models/User");

//Import validation Functions
const { registerValidation, loginValidation } = require('../validation');

//GET Auth Routes
router.get('/register', (req, res) => {
    res.render('register.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

//REGISTER
router.post('/register', async (req, res) => {
    //Validates the data before saving the user and checks for errors
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checks if value already in database, if so, return error.
    const phoneNumberExist = await User.findOne({phonenumber: req.body.phonenumber});
    if (phoneNumberExist) return res.status(400).send("Phone Number already registered");
    //Checks if value already in database, if so, return error.
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send("Username already taken");
    //Checks if value already in database, if so, return error.
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email already registered");
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //saving user
    try {
        const savedUser = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            secondlastname: req.body.secondlastname,
            phonenumber: req.body.phonenumber,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        res.redirect('http://localhost:3000/api/user/login');
    }catch (error) {
        res.status(400).send(error);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Cheking if user exist en database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email or password invalid");
    //Cheking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Email or password invalid");
});

module.exports = router;
