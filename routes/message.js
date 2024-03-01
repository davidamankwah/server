// Import necessary modules
import express from 'express';
import { sendMessage, getMessages, deleteMessage } from '../controller/message.js';
import { verifyToken } from '../middleware/auths.js';

// Initialize express router
const router = express.Router();

// Define routes
router.post('/send', verifyToken, sendMessage);
router.get('/', verifyToken, getMessages);
router.delete('/:id', verifyToken, deleteMessage);

// Export the router
export default router;
