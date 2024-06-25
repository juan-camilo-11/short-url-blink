import "./src/auth/auth-google";
import express from 'express';
import passport from 'passport';
import authRoutes from "./src/routes/auth/auth";
import userRoutes from "./src/routes/user/user";
import cors from "cors";
import dotenv from 'dotenv';
import db from './src/models/db';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: `${process.env.APP_URL_FRONTEND}`,
  methods: ['GET', 'POST'],
  credentials: true
}));

async function connectDB() {
  try {
    await db.connect();
    console.log('Application started!');
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

connectDB();

app.use(passport.initialize());

app.use(authRoutes);

app.use(userRoutes);

process.on('SIGINT', async () => {
  try {
    await db.close();
    console.log('Application Closed!');
    process.exit(0);
  } catch (error) {
    console.error('Error closing application:', error);
    process.exit(0);
  }
});

export default app;
