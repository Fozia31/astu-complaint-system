import Complaint from '../../models/complaint.model.js';

export const getAssignedComplaints = async (req,res) => {
    try{
        const complaints = await Complaint.find({assignedTo: req.user._id});

        if(complaints.length === 0){
            return res.status(200).json({message: 'No complaints assigned to you',data:[]});
        }
        return res.status(200).json({message: 'Assigned complaints retrieved successfully',data:complaints});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const updateComplaintStatus = async (req,res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;

        const allowedStatuses = ["open","in-progress","resolved"];

        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message: 'Invalid status'});
        }

        const complaint = await Complaint.findById(id);

        if(!complaint){
            return res.status(404).json({message: 'Complaint not found'});
        }

        if(complaint.assignedTo.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Access denied'});
        }

        complaint.status = status;

        if(status === "resolved"){
            complaint.resolvedAt = Date.now();
        }
        await complaint.save();
        return res.status(200).json({message: 'Complaint status updated successfully',data:complaint});
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const addComplaintRemarks = async (req,res) => {
    try{
        const {id} = req.params;
        const {message} = req.body;

        const complaint = await Complaint.findById(id);

        if(!complaint){
            return res.status(404).json({message: 'Complaint not found'});
        }

        if(complaint.assignedTo.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Access denied'});
        }

        complaint.remarks.push({
            message,
            addedBy: req.user._id
        });
        await complaint.save();
        return res.status(200).json({message: 'Remark added successfully',data:complaint});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}