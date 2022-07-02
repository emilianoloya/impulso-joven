//IMPORT DEPENDECIES
const router = require('express').Router();
const passport = require('passport');
const { findOne } = require('../models/User');

//IMPORT USER MODEL
const User = require('../models/User');

//FUNCTIONS
//Checks if the current user is authenticated to give it access
//If user not authenticated redirect to login page.
const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('http://localhost:3000/auth/user/login');
}
//GET USER ROUTES
//Get authenticated user profile front page.
router.get('/home', checkAuthentication, (req, res) => {
    res.render('user-profile.ejs', { user: req.user });
})



module.exports = router;



