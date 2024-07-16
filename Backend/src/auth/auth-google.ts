import User from "../models/user";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { jwtOptions } from "./StrategyJWT";

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
      const userRegister = await User.findByGoogleId(user.getGoogleId());
      if (!userRegister) await user.create(user);
      const tokenJWT = jwt.sign({ googleId: profile.id }, jwtOptions.secretOrKey);
      return done(null, tokenJWT);
    } catch (err) {
      throw err;
    }
  }
));

passport.serializeUser((user: any, done: any) => {
  done(null, user)
})
passport.deserializeUser((user: any, done: any) => {
  done(null, user)
})