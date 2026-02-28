import Complaint from '../../models/complaint.model.js';
import mongoose from 'mongoose';

// staff.controller.js
export const getAssignedComplaints = async (req, res) => {
    try {
        const staffId = req.user.id;
        const { status, search } = req.query;

        // Build dynamic query
        let query = { assignedTo: staffId };

        // Filter by status if not 'all'
        if (status && status !== 'all') {
            query.status = status;
        }

        // Search by title or student name (using regex)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { 'student.name': { $regex: search, $options: 'i' } } 
            ];
        }

        const complaints = await Complaint.find(query)
            .populate('student', 'name email')
            .populate('category', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, complaints });
    } catch (err) {
        res.status(500).json({ message: "Error fetching complaints", error: err.message });
    }
};

// 2. Get Single Detail
export const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;
        const staffId = req.user._id || req.user.id;

        const complaint = await Complaint.findOne({ _id: id, assignedTo: staffId })
            .populate('student', 'name email department')
            .populate('category', 'name')
            .populate('remarks.addedBy', 'name email');

        if (!complaint) return res.status(404).json({ message: "Complaint not found or unauthorized" });

        res.status(200).json({ success: true, complaint });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 3. Update Status
export const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const staffId = req.user._id || req.user.id;

        const allowedStatuses = ["open", "in-progress", "resolved"];
        if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

        const complaint = await Complaint.findOneAndUpdate(
            { _id: id, assignedTo: staffId },
            { 
                status, 
                ...(status === "resolved" ? { resolvedAt: Date.now() } : {}) 
            },
            { new: true }
        );

        if (!complaint) return res.status(404).json({ message: 'Complaint not found or unauthorized' });

        return res.status(200).json({ message: 'Status updated', data: complaint });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const addComplaintRemarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const staffId = req.user._id || req.user.id;

        if (!message?.trim()) return res.status(400).json({ message: 'Remark cannot be empty' });

        const complaint = await Complaint.findOne({ _id: id, assignedTo: staffId });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        complaint.remarks.push({ message: message.trim(), addedBy: staffId });
        await complaint.save();

        const updated = await Complaint.findById(id)
            .populate('student', 'name email')
            .populate('remarks.addedBy', 'name email');

        return res.status(200).json({ message: 'Remark added', data: updated });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};


export const getStaffDashboardSummary = async (req, res) => {
    try {
        const staffId = req.user._id || req.user.id;

        // 1. Fetch Stats
        const stats = await Complaint.aggregate([
            { $match: { assignedTo: new mongoose.Types.ObjectId(staffId) } },
            { 
                $group: { 
                    _id: null,
                    totalAssigned: { $sum: 1 },
                    pending: { $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] } },
                    resolved: { $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] } }
                } 
            }
        ]);

        // 2. Fetch Recent Complaints (This fills your table!)
        const recentComplaints = await Complaint.find({ assignedTo: staffId })
            .populate('student', 'name')
            .populate('category', 'name')
            .sort({ createdAt: -1 }) // Newest first
            .limit(5); // Just the top 5 for the dashboard

        res.status(200).json({
            success: true,
            summary: stats[0] || { totalAssigned: 0, pending: 0, resolved: 0 },
            recentComplaints // ✅ Make sure this is sent!
        });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};