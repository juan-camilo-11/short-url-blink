import { Router } from 'express';
import { UrlController } from '../controllers/url';

const router = Router();

router.post('/click', UrlController.registerClick);

export default router;
