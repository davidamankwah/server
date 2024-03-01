// comment.js
import Post from "../models/Post.js";

export const addReply = async (req, res) => {
    try {
      const { userId, userName, text } = req.body;
      const { postId, commentId } = req.params;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const newReply = { userId, userName, text };
      comment.replies.push(newReply);
  
      const updatedPost = await post.save();
  
      res.status(201).json(updatedPost);
    } catch (error) {
      console.error('Error adding reply:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  