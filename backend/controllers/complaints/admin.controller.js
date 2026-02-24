import Complaint from "../../models/complaint.model.js";

export const getAllComplaints = async (req,res) => {
    try{
        const complaints = await Complaint.find()
            .populate('student', 'name email')
            .populate('assignedTo', 'name email');

        return res.status(200).json({
            message:'all complaints',
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
            return res.status(404).json({message:'complaint not found'})
        }
        
        complaint.assignedTo = staffId;
        await complaint.save();
        return res.status(200).json({
            message:'complaint assigned to staff successfully',
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

        const complaint = await Complaint.findById(id);
    
        if(!complaint){
            return res.status(404).json({message:'complaint not found'})
        }
        await complaint.findByIdAndDelete(id);
        
        return res.status(200).json({
            message:'complaint deleted successfully'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}