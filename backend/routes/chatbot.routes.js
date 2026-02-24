import express from 'express';
import { uploadDocument,askChatbot  } from '../controllers/chatbot.controller.js';

const router = express.Router();

router.post('/chatbot/ask',askChatbot);
router.post('/chatbot/upload-doc', uploadDocument);

export default router;