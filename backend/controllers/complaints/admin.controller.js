// backend/controllers/complaints/admin.controller.js
import Complaint from "../../models/complaint.model.js";
import User from "../../models/user.model.js";

export const getAllComplaints = async (req,res) => {
    try{
        const complaints = await Complaint.find()
            .populate('student', 'name email')
            .populate('assignedTo', 'name email');

        return res.status(200).json({
            message:'All complaints retrieved successfully',
            complaints: complaints
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'})
    }
}

export const assignComplaintToStaff = async (req,res) => {
    try{
        const {staffId} = req.body;
        const {id} = req.params;

        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:'Complaint not found'})
        }
        
        const staff = await User.findById(staffId);
        if(!staff || staff.role !== "staff"){
            return res.status(400).json({message: "Invalid staff ID"});
        }
        complaint.assignedTo = staff._id;

        await complaint.save();

        return res.status(200).json({
            message:'Complaint assigned to staff successfully',
            complaint: complaint
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

export const deleteComplaint = async (req,res) => {
    try{
        const {id} = req.params;

        const complaint = await Complaint.findByIdAndDelete(id);
    
        if(!complaint){
            return res.status(404).json({
                message:'Complaint not found'
            })
        }        
        return res.status(200).json({
            message:'Complaint deleted successfully',
            complaint: complaint
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

export const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        // Populate student, assigned staff, and category to get full details
        const complaint = await Complaint.findById(id)
            .populate('student', 'name email department')
            .populate('assignedTo', 'name email department')
            .populate('category', 'name'); // Assuming your Category model has a 'name' field

        if (!complaint) {
            return res.status(404).json({
                message: 'Complaint not found'
            });
        }

        return res.status(200).json({
            message: 'Complaint retrieved successfully',
            complaint: complaint
        });

    } catch (err) {
        // Handle invalid MongoDB ObjectIDs
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Complaint ID format' });
        }
        console.error("Error in getComplaintById:", err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};