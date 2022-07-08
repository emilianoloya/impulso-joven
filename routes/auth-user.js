//IMPORT DEPENDECIES
const router = require('express').Router();
const passport = require('passport');

//IMPORT USER MODEL
const User = require('../models/User');

//GET USER ROUTES
//Get authenticated user home page.
router.get('/home', userIsAuthenticated, (req, res) => {
    res.render('user-home.ejs', { user: req.user });
});
//Get authenticated user profile page.
router.get('/profile', userIsAuthenticated, (req, res) => {
    res.render('user-profile.ejs', { user: req.user });
})

router.get('/config', userIsAuthenticated, (req, res) => {
    res.render('user-config.ejs', { user: req.user });
})

//LOGOUT
router.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
       return next(err);
    });

    res.redirect('http://localhost:3000');
});

//FUNCTIONS
//Checks user authentication
async function userIsAuthenticated(req, res, next) {
    try {

        if(req.isAuthenticated()) {
            return next();
        };
    
        res.redirect('http://localhost:3000/auth/user/login');

    } catch (err) {
        res.send(err);
    }
};

module.exports = router;



