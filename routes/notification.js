import express from "express";
import { createNotification } from "../controller/notification.js";

const router = express.Router();

// Get user information by ID
router.post('/', createNotification);

export default router;