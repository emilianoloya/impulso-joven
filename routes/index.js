const express = require('express');
const router = express.Router();

//index route
router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index.ejs')
});

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('http://localhost:3000/auth/user/home');
    }

    next();
}

module.exports = router;