//Import mongoose depencecies to create user model.
const mongoose = require('mongoose');

//Creatig a model template for Users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

//Exports user model to use it in server.js
module.exports = mongoose.model("User", userSchema);
