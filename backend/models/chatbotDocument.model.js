import mongoose from "mongoose";

const chatbotDocumentSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    fileName: { 
      type: String, required: true 
    },
    fileUrl: { 
      type: String, required: true 
    },
    content: { 
      type: String, required: true 
    }, 
    embeddings: { 
      type: [Number], 
      required: true 
    } 
}, { timestamps: true });

const ChatbotDocument = mongoose.model("ChatbotDocument", chatbotDocumentSchema);
export default ChatbotDocument;