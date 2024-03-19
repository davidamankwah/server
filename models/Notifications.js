// notification.model.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: String,
},
{ timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;