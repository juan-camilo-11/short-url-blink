import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error`, session: false }),
    async function (req, res) {
        try{
            res
                .cookie('jwt', req.user, 
                { 
                    httpOnly: false, secure: true, sameSite: 'none'
                })
                .redirect(`${process.env.APP_URL_FRONTEND}/short-url-blink/api/hello`);
        }catch(err){
            console.log(err)
        }
    }
);

export default router;
