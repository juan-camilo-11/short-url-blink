import { Router } from 'express';
import dotenv from 'dotenv';
import passport from '../auth/StrategyJWT';
import { UserController } from '../controllers/user';

const router = Router();

dotenv.config();

router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.getProfile);

router.get('/profile/logout', UserController.logout);

export default router;
