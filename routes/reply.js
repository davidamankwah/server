// replies.js
import express from 'express';
import { verifyToken } from '../middleware/auths.js';
import { addReply } from '../controller/reply.js';
const router = express.Router();

// Route to add a reply to a comment
router.post('/:postId/comments/:commentId/replies', verifyToken, addReply);

export default router;
