//IMPORT DEPENDECIES
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//IMPORT MODELS
const User = require("../models/User");

//GET AUTH ROUTES
//Get register page.
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});
//Get login page.
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

//REGISTER
router.post('/register', checkNotAuthenticated, async (req, res) => {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Saving user
    try {
        await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            secondlastname: req.body.secondlastname,
            phonenumber: req.body.phonenumber,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        res.redirect('http://localhost:3000/auth/user/login');
    }catch (err) {
        res.status(400).send('There was an error saving the user');
        console.log(err);
    };
});

//LOGIN
router.post('/login', checkNotAuthenticated, passport.authenticate('local', 
    { failureRedirect: 'http://localhost:3000/auth/user/login', failureMessage: true}), 
    (req, res) => {
        res.redirect('http://localhost:3000/auth/user/home');
    });

//FUNCTIONS
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
       return res.redirect('http://localhost:3000/auth/user/home');
    }

    next();
}

module.exports = router;
