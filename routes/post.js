// Importing the Express framework for handling routes
import express from "express";

// Importing controller functions for post-related operations
import { getFeedPosts, getUserPosts, likePost, dislikePost ,deletePost, updatePost } from "../controller/post.js";

// Importing middleware for checking authentication tokens
import { checkToken } from "../middleware/auth.js";

import { verifyToken } from "../middleware/auths.js";


// Creating an Express router
const router = express.Router();

// Route to get the feed posts, requiring authentication check
router.get("/", checkToken, getFeedPosts);

// Route to get posts associated with a specific user, requiring authentication check
router.get("/:userId/posts", checkToken, getUserPosts);

// Route to like or unlike a post, requiring authentication check
router.patch("/:id/like", checkToken, likePost);

// Route to dislike or undislike a post, requiring authentication check
router.patch("/:id/dislike", checkToken, dislikePost);

router.delete("/:id", checkToken, deletePost); // Add this line for the delete route

router.patch('/:postId', verifyToken, async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const user = req.user;

    try {
        // Assuming your updatePost function is asynchronous
        const updatedPost = await updatePost(user, postId, text);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


// Exporting the router for use in other parts of the application
export default router;
