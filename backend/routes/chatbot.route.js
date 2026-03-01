import express from 'express';
import { askChatbot ,uploadDocument} from '../controllers/chatbot.controller.js'; 
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/chatbot/ask', authMiddleware, askChatbot);
router.post('/chatbot/upload-doc', authMiddleware, uploadDocument);

export default router;