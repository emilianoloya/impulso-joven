//Import Dependecies
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Import Model
const User = require("../models/User");

//GET Auth Routes
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/profile', (req, res) => {
    res.render('profile.ejs');
})

router.get('/status-400', (req, res) => {
    res.render('status-400.ejs')
})

//REGISTER
router.post('/register', async (req, res) => {
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
        res.redirect('http://localhost:3000/api/user/login');
    }catch (error) {
        res.status(400).redirect('http://localhost:3000/api/user/status-400');

    }
});

//LOGIN
router.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/api/user/profile',
    failureRedirect: 'http://localhost:3000/api/user/login',
    failureFlash: true
}));

module.exports = router;
