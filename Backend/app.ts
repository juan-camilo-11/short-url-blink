import "./src/auth/auth-google";
import express from 'express';
import passport from 'passport';
import authRoutes from "./src/routes/auth/auth";
import userRoutes from "./src/routes/user/user";
import { client } from "./src/db/connection";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: `${process.env.APP_URL_FRONTEND}`,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(passport.initialize());

app.use(authRoutes);

const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

app.use(userRoutes, authenticateJWT);

process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});

export default app;
