const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys =  require('../config/keys'); //two dots is go up one directory and then search in config folder

const User = mongoose.model('users');



passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, done) => {
    // console.log('access token',accessToken); //getting access to the users profile
    // console.log('refresh token',refreshToken); //automatically refresh/update the access token
    // console.log('profile',profile);
    User.findOne({ googleID: profile.id })
       .then((existingUser) => {
        if(existingUser){
          // we already have a record with the given profile ID
          done(null, existingUser);
        }
        else{
        // we don't have a user with the ID. Please create a new user.
        new User({ googleID: profile.id }).save()
          .then(user => done(null, user));
        }
       
       })

})
); // defining the new passport strategy and asking passport to use it

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{ //initiated after the done callback only ie. entry into the database 
 User.findById(id) // you know its a promise when its a query followed by a then. A query to be always followed by a then, always defined as a promise!
 .then(user => {
  done(null, user);
 });
});