// notification.controller.js
import Notification from "../models/Notifications.js";

export const createNotification = async (req, res) => {
    try {
      const { message } = req.body;
      const newNotification = new Notification({ message });
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Implement other CRUD operations as needed
