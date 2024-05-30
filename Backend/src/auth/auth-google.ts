import { registerUser } from "../db/register/user.register";
import { validateRegisteredUser } from "../db/validate/validateRegisteredUser";
import User from "../models/user.model";
import dotenv from 'dotenv';
dotenv.config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.APP_URL_BACKEND}/auth/google/callback`
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = new User(profile.id, profile.displayName, profile.emails[0].value);
      const userRegister = await validateRegisteredUser(user.getGoogleId());
      if (!userRegister) registerUser(user);
    } catch (err) {
      throw err;
    }
    return done(null, profile);
  }
));

passport.serializeUser((user: any, done: any) => {
  done(null, user)
})
passport.deserializeUser((user: any, done: any) => {
  done(null, user)
})