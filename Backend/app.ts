import "./src/auth/auth-google";
import express from 'express';
import passport from 'passport';
import authRoutes from "./src/routes/auth";
import userRoutes from "./src/routes/user";
import urlRoutes from "./src/routes/url";
import clickRoutes from "./src/routes/click";
import db from './src/models/db';
import { corsMiddleware } from "./src/middlewares/cors";
import { authMiddleware } from "./src/middlewares/auth";

const app = express();
app.use(express.json());

app.use(corsMiddleware());

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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola, este es un GET simple!' });
});

app.use(passport.initialize());

app.use(authRoutes);

app.use(clickRoutes);

app.use(userRoutes);

app.use(authMiddleware());

app.use(urlRoutes);

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
