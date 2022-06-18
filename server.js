//Import Dependecies
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
require('dotenv/config');

//Import Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');

//Import Passport Configuration
const initializePassport = require('./passport-config');
initializePassport(passport);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => console.log("Connected to Database"));

//Middlewares
app.set('view-engine', 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({ extended: false}));
//Body Parser
app.use(express.json());
//Express Flash
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//Passport Auth middleware
app.use(passport.initialize());
app.use(passport.session());

//Route Middlewares
app.use('/', indexRoute);
app.use('/api/user', authRoute);

//Connection to Server
app.listen(3000, () => console.log('Server is running'));

