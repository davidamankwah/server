// Import necessary modules
import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesBySender = async (req, res) => {
  try {
    const { senderId } = req.params;
    const messages = await Message.find({ sender: senderId }).populate('sender', 'userName'); // Populate the sender's name
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages by sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const messages = await Message.find({ receiver: receiverId }).populate('sender', 'userName'); // Populate the sender's name
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages by receiver:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await Message.findByIdAndDelete(messageId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};