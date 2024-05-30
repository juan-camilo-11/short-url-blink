import express from 'express';
import passport from 'passport';
import session from 'express-session';
import "./src/auth/auth-google";
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

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Hola mundo")
});

app.use(authRoutes);

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthenticated user' });
}

app.use(isAuth);
app.use(userRoutes);

process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});

export default app;
