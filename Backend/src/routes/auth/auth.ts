import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google',{failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error`}),
    function (req, res) {
        res.redirect(`${process.env.APP_URL_FRONTEND}/short-url-blink/`);
    });

router.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.status(200).json('Closed session');
    });
});


export default router;
