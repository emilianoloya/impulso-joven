//Import dependecies
const express = require('express');
const router = express.Router();

//Import Model
const User = require('../models/User');

//View Profiles
router.get('/:username', (req, res) => {
    getProfileByUsername(req, res);
});

//Functions
const getProfileByUsername = async (req, res) => {
    const queryUsername = await User.where({username: req.params.username})
    if (!queryUsername) {
        res.status(404).send('User not found');
    }

    try {
        res.render('profile.ejs');
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = router;