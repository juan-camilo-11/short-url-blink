import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error`, session: false }),
    async function (req, res) {
        try{
            const token = req.user; 

            const redirectUrl = `${process.env.APP_URL_FRONTEND}/short-url-blink/auth?token=${token}`;
            res.redirect(redirectUrl);
        }catch(err){
            console.log(err)
        }
    }
);

export default router;
