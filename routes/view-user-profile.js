//IMPORT DEPENDECIES
const express = require('express');
const router = express.Router();

//IMPORT MODELS
const User = require('../models/User');

//GET PROFILE ROUTE
//View Profiles
router.get('/:username', (req, res) => {
    getProfileByUsername(req, res);
});

//FUNCTIONS
async function getProfileByUsername(req, res) {
    //Query database looking for matching Username in the URL.
    const user = await User.findOne({ username: req.params.username });
    try {
        //If User not found in database send a status 404 else render Profile.
        if (!user) {
            res.status(404).send('User Not Found.');
        } else {
            //If success render profile and fetch user data to view-profile.ejs.
            res.render('view-user-profile.ejs', { user: user });
        }
    } catch (err) {
        //In case there is an error in the server send a status 500 and a log the error.
        res.status(500).send('There was an Error on the Server.');
        console.log(err);
    }
}

module.exports = router;