// comment.js
import express from 'express';
import { verifyToken } from '../middleware/auths.js';
import { addComment } from '../controller/comment.js';
import { deleteComment } from '../controller/comment.js';

const router = express.Router();

// Route to add a comment to a post
router.post('/:postId/comments', verifyToken, addComment);
router.delete('/:postId/comments/:commentId', verifyToken, deleteComment);

export default router;
