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
const getProfileByUsername = async (req, res) => {
    //Query database looking for matching Username in the URL.
    const queryUsername = await User.findOne({username: req.params.username})
    try {
        //If User not found in database send a status 404 else render Profile.
        if (!queryUsername) {
            res.status(404).send('User Not Found.');
        } else {
            res.render('view-profile.ejs');
        }
    } catch (err) {
        //In case there is an error in the server send a status 500 and a log the error.
        res.status(500).send('There was an Error on the Server.');
    }
};

module.exports = router;