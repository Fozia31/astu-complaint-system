import Complaint from "../../models/complaint.model.js";
import mongoose from 'mongoose';

export const createComplaint = async (req, res) => {
    try{
        const { title, description ,category} = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Title, description and category are required' });
        }

        const complaint = await Complaint.create({
            title,
            description,
            category,
            student: req.user._id,
            attachments: req.body.attachments || [],

        })
        return res.status(201).json({message:'complaint sucessfully created' , data:complaint});
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const getMyComplaints = async (req,res) =>{
    try{
        const complaints = await Complaint
            .find({ student: req.user._id })
            .populate('category', 'name')
            .populate('student', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json({message: 'Complaints retrieved successfully',data:complaints});


    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const getComplaintById = async (req,res) => {
    const {id} = req.params;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid complaint ID' });
        }

        const complaint = await Complaint.findById(id)
            .populate('student','name email')
            .populate('assignedTo','name email role')
            .populate('remarks.addedBy', 'name email role');

        if(!complaint){
            return res.status(404).json({message: 'Complaint not found'});
        }
        
        if(req.user.role === "student" && complaint.student._id.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Access denied'});
        }
        return res.status(200).json({message: 'Complaint retrieved successfully',data:complaint});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}