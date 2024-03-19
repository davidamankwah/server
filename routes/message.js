// message.router.js
import express from "express";
import { createMessage, getMessagesByReceiver,getMessagesBySender, deleteMessage } from "../controller/message.js";


const router = express.Router();

router.get('/sender/:senderId', getMessagesBySender);
router.get('/receiver/:receiverId', getMessagesByReceiver);
router.post("/", createMessage);
router.delete("/:messageId", deleteMessage); 

export default router;
