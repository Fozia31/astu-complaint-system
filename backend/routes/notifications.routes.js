import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notifications.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/notifications',authMiddleware,getNotifications);
router.patch('/notifications/:id/read',authMiddleware,markNotificationAsRead);

export default router;