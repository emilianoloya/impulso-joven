//Import Dependecies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

//Import Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to Database"));

//Middlewares
app.set('view-engine', 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Route Middlewares
app.use('/', indexRoute);
app.use('/api/user', authRoute);

//Connection to Server
app.listen(3000, () => console.log('Server is running'));

