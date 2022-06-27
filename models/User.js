//Import mongoose depencecies to create user model.
const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');

//Creatig a model template for User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    secondlastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

//Exports user model to use it in server.js
module.exports = mongoose.model("User", userSchema);
