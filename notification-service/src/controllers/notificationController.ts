import { Request, Response } from 'express';
import Notification from '../models/Notification';
import User from '../../../shared/src/models/User';
import { sendEmail } from './emailService';
import { UserPayload } from '../../../types/express/types';

// Send an in-app and/or email notification
export const sendNotification = async (req: Request, res: Response) => {
    try {
      const { message, type } = req.body;
      const userId = (req.user as UserPayload).userId;
      const newNotification = new Notification({ user: userId, message, type });
  
      await newNotification.save();
  
      if (type === 'email') {
        const user = await User.findById(userId);
        if (user) {
          await sendEmail(user.email, 'Notification', message);
        }
      }
  
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ message: 'Error sending notification', error });
    }
  };

export const getUserNotifications = async (req: Request, res: Response) => {
    try {
        if (!req.user || !(req.user as UserPayload).userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = (req.user as UserPayload).userId;
        const notifications = await Notification.find({ userId });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark a notification as read
export const markAsRead = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const notification = await Notification.findById(id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      notification.read = true;
      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Error marking notification as read', error });
    }
  };
