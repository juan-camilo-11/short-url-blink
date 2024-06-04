import passport from 'passport';
import { validateRegisteredUser } from '../db/validate/validateRegisteredUser';
import dotenv from 'dotenv';

dotenv.config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  const user = validateRegisteredUser(payload.sub);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));