import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error`, session: false }),
    async function (req, res) {
        try{
            console.log("-Auth")
            res
                .cookie('jwt', req.user, 
                { 
                    httpOnly: false
                })
                .redirect(`${process.env.APP_URL_FRONTEND}/short-url-blink/auth`);
        }catch(err){
            console.log(err)
        }
    }
);

export default router;
