//Import dependecies
const router = require('express').Router();
const bcrypt = require('bcryptjs');


// Import Models
const User = require("../models/User");

//GET Auth Routes
router.get('/register', (req, res) => {
    res.render('register.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

//REGISTER
router.post('/register', async (req, res) => {
    //Hash password
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
        res.redirect('http://localhost:3000/api/user/register');
    }
});

//LOGIN

module.exports = router;
