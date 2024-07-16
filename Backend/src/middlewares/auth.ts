import passport from '../auth/StrategyJWT';

export const authMiddleware = () => passport.authenticate('jwt', { session: false });