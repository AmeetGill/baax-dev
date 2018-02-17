const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
//console.log(keys);
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});
// hey this ust to coomit
passport.deserializeUser((id,done)=>{
  User.findById(id)
    .then((user =>{
      done(null,user);
    }));
});

passport.use(
  new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
  },
  (accessToken,refreshToken,profile,done) => {
    User.findOne({googleId:profile.id})
      .then((existingUser) => {
        if(existingUser){
            // user already exist in the data base
            done(null,existingUser);
        }
        else{
            new User({googleId:profile.id})
              .save()
              .then(user => done(null,user));
        }
      })

  })
);

passport.use(
  new FacebookStrategy({
    clientID:keys.facebookClientID,
    clientSecret:keys.facebookClientSecret,
    callbackURL:"http://localhost:5000/auth/facebook/callback"
  },
  (accessToken,refreshToken,profile,done) => {
    //console.log(profile);
    User.findOne({facebookId:profile.id})
      .then((existingUser) => {
        if(existingUser){
          done(null,existingUser);
        }
        else{
          console.log(profile);
          new User({facebookId:profile.id})
            .save()
            .then((user) => {
              done(null,user)
            });
        }
      })
  })
);
