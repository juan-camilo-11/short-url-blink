import { Router } from 'express';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { findUser } from '../../db/queries/findUser';

const router = Router();

dotenv.config();

router.get('/profile', async (req, res) => {

    try{
        const tokenJWT = req.headers.authorization;
        const decodedToken = jwt.verify(tokenJWT, process.env.JWT_SECRET);
        
        const googleId = decodedToken.googleId;
        
        const user = await findUser(googleId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({user: user})
    }catch(err){
        throw err;
    }
});

export default router;
