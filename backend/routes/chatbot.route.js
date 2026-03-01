import express from 'express';
import { askChatbot ,uploadDocument} from '../controllers/chatbot.controller.js'; 
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// The paths here are relative to where this router is mounted in server.js
router.post('/chatbot/ask', authMiddleware, askChatbot);
router.post('/chatbot/upload-doc', authMiddleware, uploadDocument);

export default router;