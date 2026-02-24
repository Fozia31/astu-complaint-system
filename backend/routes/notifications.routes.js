import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notifications.controller.js'
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/notifications',protect,getNotifications);
router.patch('/notifications/:id/read',protect,markNotificationAsRead);

export default router;