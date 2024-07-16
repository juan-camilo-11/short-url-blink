import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

export const corsMiddleware = () => cors({
    origin: `${process.env.APP_URL_FRONTEND}`,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })