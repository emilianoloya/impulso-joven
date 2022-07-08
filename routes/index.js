const express = require('express');
const router = express.Router();

//index route
router.get('/', checkUserAutentication, (req, res) => {
    res.render('index.ejs')
});

function checkUserAutentication(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('http://localhost:3000/auth/user/home');
    }

    next();
}

module.exports = router;