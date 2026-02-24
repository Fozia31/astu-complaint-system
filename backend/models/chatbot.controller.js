import ChatbotDocument from "../models/chatbotDocument.model.js";

export const askChatbot = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) return res.status(400).json({ message: "Question is required" });

        const answer = await generateAnswer(question, req.user._id); 

        res.status(200).json({ message: "Answer retrieved successfully", data: answer });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const uploadDocument = async (req, res) => {
    try {
        const { fileName, fileUrl } = req.body;
        if (!fileName || !fileUrl) return res.status(400).json({ message: "File name and URL are required" });

        const doc = await ChatbotDocument.create({
            user: req.user._id,
            fileName,
            fileUrl,
            embeddings: [] 
        });

        res.status(201).json({ message: "Document uploaded successfully", data: doc });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};