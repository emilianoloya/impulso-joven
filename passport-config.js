//Import Dependecies
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Import Model
const User = require('./models/User');

//Initialize Passport Function
const initialize = (passport) =>  {
    //Checks if user email exists in db and compares password
    const authenticateUser = async (email, password, done) => {

        const user = await User.findOne({ email: email });

        if(!user) {
            return done(null, false, { message: 'Correo electronico o Contraseña incorrecta' });
        };

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Correo electronico o Contraseña incorrecta' });
            };
        } catch(err) {
            return done(err);;
        };
    };

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
};

module.exports = initialize;
