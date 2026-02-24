import mongoose from "mongoose";

const chatbotDocumentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileName: { 
      type: String, 
      required: true 
    },
    fileUrl: {
      type: String,
      required: true }, 
    embeddings: {
      type: Array, 
      default: [] },  
}, { timestamps: true });

const ChatbotDocument = mongoose.model("ChatbotDocument", chatbotDocumentSchema);
export default ChatbotDocument;