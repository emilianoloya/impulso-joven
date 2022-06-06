const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv/config');
//const User = require("./models/User")

//Connect to DB
 mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to DataBase'));

//Middlewares
app.set('view-engine', 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Import Routes
const indexRoute = require('./routes/index')
const registerRoute = require('./routes/register')
const loginRouter = require('./routes/login')
//Get index route
app.use('/', indexRoute);

//Get login route
app.use('/register', registerRoute);

//Get register route
app.use('/login', loginRouter);

app.listen(3000);

