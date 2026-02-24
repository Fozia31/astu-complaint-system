import mongoose from "mongoose";

const chatbotDocumentSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    embedding: {
      type: [Number], 
    },
  },
  { timestamps: true }
);

export default mongoose.model("ChatbotDocument", chatbotDocumentSchema);