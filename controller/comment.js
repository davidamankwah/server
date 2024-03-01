// comment.js
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = { userId, userName, text };
    post.comments.push(newComment);

    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Find the post containing the comment
    const post = await Post.findById(postId);

    // Find the index of the comment in the post's comments array
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

    // Check if the comment belongs to the user (you might need to compare userId)
    // For example: if (post.comments[commentIndex].userId.toString() !== req.user.id) ...
    // Ensure that only the owner of the comment can delete it

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);

    // Save the updated post to the database
    await post.save();

    // Respond with a success message or updated post
    res.status(200).json({ message: 'Comment deleted successfully', updatedPost: post });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

