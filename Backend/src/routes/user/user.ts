import { Router } from 'express';
import dotenv from 'dotenv';
import passport from '../../auth/StrategyJWT';

const router = Router();

dotenv.config();

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: user })
    } catch (err) {
        throw err;
    }
});

router.get('/profile/logout', (req, res) => {
    res.clearCookie("jwt");
    res.end();
});

export default router;
