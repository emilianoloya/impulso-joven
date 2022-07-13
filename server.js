//IMPORT DEPENDECIES
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
require('dotenv/config');

//IMPORT ROUTES
const indexRoute = require('./routes/index');
const authRoute = require('./routes/authentication');
const authUserProfile = require('./routes/auth-user');
const viewUserProfileRoute = require('./routes/view-user-profile');

//IMPORT PASSPORT CONFIGURATION
const initilizePassport = require('./passport-config');

//Initialize passport configuration function
initilizePassport(passport);

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

//METHOD OVERRIDE MIDDLEWARES
app.use(methodOverride('_method'));
//ROUTE MIDDLEWARES
app.use('/', indexRoute);
app.use('/auth/user', authRoute, authUserProfile);
app.use('/user', viewUserProfileRoute);

//CONNECTION TO SERVER
app.listen(3000, () => console.log('Server is running'));

