import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error`, session: false }),
    function (req, res) {
        res
            .cookie('jwt', req.user, { httpOnly: true })
            .redirect(`${process.env.APP_URL_FRONTEND}/short-url-blink/dashboard`);
    }
);

router.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.status(200).json('Closed session');
    });
});


export default router;
