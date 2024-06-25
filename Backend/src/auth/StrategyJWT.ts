import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await User.findByGoogleId(payload.googleId);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

export default passport;