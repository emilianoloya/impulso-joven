const express = require('express');
const router = express.Router();

//Register form get route
router.get('/', (req, res) => {
    res.render("login.ejs")
});

module.exports = router;