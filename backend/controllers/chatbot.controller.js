import pdf from "pdf-parse-debugging-disabled";
import ChatbotDocument from "../models/chatbotDocument.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const uploadDocument = async (req, res) => {
    try {
        const { fileName, fileUrl } = req.body;
        if (!fileName || !fileUrl) {
            return res.status(400).json({ message: "File name and URL are required" });
        }

        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const dataBuffer = Buffer.from(response.data);
        const parsedPdf = await pdf(dataBuffer); 
        const extractedText = parsedPdf.text;

        // UPDATED: Stable 2026 Embedding model
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        
        const result = await model.embedContent({
            content: { parts: [{ text: extractedText.substring(0, 8000) }] },
            outputDimensionality: 768 
        });
        const embedding = result.embedding.values;

        const doc = await ChatbotDocument.create({
            user: req.user._id,
            fileName,
            fileUrl,
            content: extractedText,
            embeddings: embedding 
        });

        res.status(201).json({ message: "Document processed with Gemini 2026!", data: doc });
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ message: "Failed to process document", error: err.message });
    }
};

export const generateAnswer = async (question, userId) => {
    // UPDATED: Use gemini-embedding-001 with 768 dimensions
    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent({
        content: { parts: [{ text: question }] },
        outputDimensionality: 768
    });
    const queryVector = embedResult.embedding.values;

    const pipeline = [
        {
            $vectorSearch: {
                index: "vector_index", 
                path: "embeddings",
                queryVector: queryVector,
                numCandidates: 100,
                limit: 3
            }
        }
    ];

    const contextDocs = await ChatbotDocument.aggregate(pipeline);
    const contextText = contextDocs.length > 0 
        ? contextDocs.map(doc => doc.content).join("\n\n")
        : "No specific university policy found.";

    // UPDATED: Using gemini-2.5-flash (The current 2026 stable workhorse)
    // Alternatively, use "gemini-3-flash-preview" for next-gen reasoning
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are the ASTU AI Assistant. 
    Context from University Documents: ${contextText}
    
    Student Question: ${question}
    
    Help the student draft a professional complaint or answer based on the context.`;

    const chatResult = await model.generateContent(prompt);
    return chatResult.response.text();
};

export const askChatbot = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) return res.status(400).json({ message: "Question is required" });

        const answer = await generateAnswer(question, req.user._id);
        res.status(200).json({ data: answer });
    } catch (err) {
        console.error("Chatbot Error:", err);
        // Providing a more descriptive error for the 404 issue
        res.status(500).json({ 
            message: "AI Assistant unavailable. Check model versioning.",
            error: err.message 
        });
    }
};