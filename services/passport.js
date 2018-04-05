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
passport.deserializeUser(
  async (id,done) => {
  const user = await User.findById(id)
  return done(null,user);
});

passport.use(
  new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
  },
  async (accessToken,refreshToken,profile,done) => {
    const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
            // user already exist in the data base
            return done(null,existingUser);
        }

            const user = await new User({googleId:profile.id}).save();
              done(null,user);

  })
);

passport.use(
  new FacebookStrategy({
    clientID:keys.facebookClientID,
    clientSecret:keys.facebookClientSecret,
    callbackURL:"http://localhost:5000/auth/facebook/callback"
  },
  async (accessToken,refreshToken,profile,done) => {
    //console.log(profile);
    const existingUser = await User.findOne({facebookId:profile.id})
        if(existingUser){
          return done(null,existingUser);
        }
        const user = await new User({facebookId:profile.id}).save();
        done(null,user);
  })
);
