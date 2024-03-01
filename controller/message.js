// Import necessary modules
import Message from '../models/Message.js';

// Controller function to send a message
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    // Create a new message
    const message = await Message.create({ sender, receiver, content });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
};

// Controller function to get messages
export const getMessages = async (req, res) => {
  try {
    // Fetch messages from the database
    const messages = await Message.find({ $or: [{ sender: req.user._id }, { receiver: req.user._id }] });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
};

// Controller function to delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the message by ID and delete it
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
};
