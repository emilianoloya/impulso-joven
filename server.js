//IMPORT DEPENDECIES
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
require('dotenv/config');

//IMPORT ROUTES
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profiles');

//IMPORT PASSPORT CONFIGURATION
const initializePassport = require('./passport-config');
initializePassport(passport);

//CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => console.log("Connected to Database"));

//MIDDLEWARES
app.set('view-engine', 'ejs');
app.use("/public", express.static( "public" ));
app.use(express.urlencoded({ extended: false}));
//Body Parser
app.use(express.json());
//Express Flash
app.use(flash());
//Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//PASSPORT AUTH MIDDLEWARES
app.use(passport.initialize());
app.use(passport.session());

//ROUTE MIDDLEWARES
app.use('/', indexRoute);
app.use('/auth/user', authRoute);
app.use('/profile', profileRoute);

//CONNECTION TO SERVER
app.listen(3000, () => console.log('Server is running'));

