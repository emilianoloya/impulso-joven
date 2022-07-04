//IMPORT DEPENDECIES
const router = require('express').Router();
const passport = require('passport');

//IMPORT USER MODEL
const User = require('../models/User');

//GET USER ROUTES
//Get authenticated user profile front page.
router.get('/home', checkAuthentication, (req, res) => {
    res.render('user-profile.ejs', { user: req.user});
});

//FUNCTIONS
function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    };

    res.redirect('http://localhost:3000/auth/user/login');
};

module.exports = router;



