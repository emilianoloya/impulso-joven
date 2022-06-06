const express = require('express');
const router = express.Router();

//Register form get route
router.get('/', (req, res) => {
    res.render('register.ejs')
});

module.exports = router;