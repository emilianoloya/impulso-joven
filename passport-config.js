//Import Dependecies
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Import Model
const User = require('./models/User');

//Initialize Passport Function
function initialize(passport) {
    const authenticateUser = async(email, password, done) => {
        const user = await User.findOne({ email: email})
        if (!user) {
            return done(null, false, { message: 'Email not registered'});
        }
        //Match password
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect'});
            }
        }catch(error) {
            return done(error);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        })});
};

module.exports = initialize;