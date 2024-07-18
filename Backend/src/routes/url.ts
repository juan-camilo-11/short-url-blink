import { Router } from 'express';
import { UrlController } from '../controllers/url';

const router = Router();

router.get('/url', UrlController.getUrls);

router.post('/url', UrlController.createUrl);

router.delete('/url', UrlController.deleteUrl);

router.patch('/url', UrlController.updateUrl);

export default router;
