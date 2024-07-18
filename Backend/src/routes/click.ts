import { Router } from 'express';
import { UrlController } from '../controllers/url';

const router = Router();

router.post('/click', UrlController.registerClick);

router.get('/url/:id', UrlController.getUrlById);

export default router;
