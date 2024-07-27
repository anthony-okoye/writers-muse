import { Router } from 'express';
import { sendNotification, getUserNotifications, markAsRead } from '../controllers/notificationController';

const router = Router();

router.post('/notifications', sendNotification);
router.get('/notifications', getUserNotifications);
router.put('/notifications/:id/read', markAsRead);

export default router;
