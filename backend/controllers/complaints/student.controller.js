import Complaint from "../../models/complaint.model.js";
import mongoose from 'mongoose';

/**
 * CREATE a new complaint with file attachment support
 */
export const createComplaint = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        // 1. Validate required fields
        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Title, description and category are required' });
        }

        // 2. Extract ONLY the filename from Multer
        // Storing only '174082...jpg' instead of 'uploads/174082...jpg'
        const fileName = req.file ? req.file.filename : null;

        // 3. Create the document in MongoDB
        const complaint = await Complaint.create({
            title,
            description,
            category,
            student: req.user._id,
            attachments: fileName ? [fileName] : [], 
        });

        return res.status(201).json({ 
            message: 'Complaint successfully created', 
            data: complaint 
        });
    } catch (err) {
        console.error("Create Complaint Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * GET all complaints belonging to the logged-in student
 */
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint
            .find({ student: req.user._id })
            .populate('category', 'name')
            .populate('student', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json({ 
            message: 'Complaints retrieved successfully', 
            data: complaints 
        });
    } catch (err) {
        console.error("Get My Complaints Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * GET a single complaint by ID with security checks
 */
export const getComplaintById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid complaint ID' });
        }

        const complaint = await Complaint.findById(id)
            .populate('category', 'name')
            .populate('student', 'name email')
            .populate('assignedTo', 'name email role')
            .populate('remarks.addedBy', 'name email role');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        if (req.user.role === "student" && complaint.student._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return res.status(200).json({ 
            message: 'Complaint retrieved successfully', 
            data: complaint 
        });
    } catch (err) {
        console.error("Get Complaint By ID Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};