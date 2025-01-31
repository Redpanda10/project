const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Police = require('./models/Police'); 
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(
         { usernameField: "badgeNumber", passwordField: "password" },
         async (badgeNumber,password, done) => {
    try {
        console.log('Received credentials:', badgeNumber, password);
        const user = await Police.findOne({ badgeNumber });

        if (!user)
            return done(null, false, { message: 'Incorrect badgeno.' });
        
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; 