import Complaint from '../../models/complaint.model.js';
import mongoose from 'mongoose';

/**
 * 1. Fetch All Student Complaints (Removed assignedTo restriction)
 */
export const getAssignedComplaints = async (req, res) => {
    try {
        const { status, search } = req.query;

        // Build dynamic query - Now looking at ALL complaints
        let query = {}; 

        // Filter by status if not 'all'
        if (status && status !== 'all') {
            query.status = status;
        }

        // Search by title or student info
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
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

/**
 * 2. Get Single Detail (Removed assignedTo restriction)
 */
export const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find any complaint by ID regardless of who it is assigned to
        const complaint = await Complaint.findById(id)
            .populate('student', 'name email department')
            .populate('category', 'name')
            .populate('remarks.addedBy', 'name email');

        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        res.status(200).json({ success: true, complaint });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

/**
 * 3. Update Status (Removed assignedTo restriction)
 */
export const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const staffId = req.user.id; // Log who is making the change

        const allowedStatuses = ["open", "in-progress", "resolved"];
        if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { 
                status, 
                assignedTo: staffId, // Automatically assign to the staff who updates it
                ...(status === "resolved" ? { resolvedAt: Date.now() } : {}) 
            },
            { new: true }
        );

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        return res.status(200).json({ message: 'Status updated', data: complaint });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * 4. Add Remarks (Removed assignedTo restriction)
 */
export const addComplaintRemarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const staffId = req.user.id;

        if (!message?.trim()) return res.status(400).json({ message: 'Remark cannot be empty' });

        const complaint = await Complaint.findById(id);
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Add remark and ensure the ticket is assigned to this staff
        complaint.remarks.push({ message: message.trim(), addedBy: staffId });
        complaint.assignedTo = staffId; 
        
        await complaint.save();

        const updated = await Complaint.findById(id)
            .populate('student', 'name email')
            .populate('remarks.addedBy', 'name email');

        return res.status(200).json({ message: 'Remark added', data: updated });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * 5. Dashboard Summary (Global Staff Stats)
 */
export const getStaffDashboardSummary = async (req, res) => {
    try {
        // Stats for ALL complaints in the system
        const stats = await Complaint.aggregate([
            { 
                $group: { 
                    _id: null,
                    totalAssigned: { $sum: 1 },
                    pending: { $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] } },
                    resolved: { $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] } }
                } 
            }
        ]);

        const recentComplaints = await Complaint.find()
            .populate('student', 'name')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            summary: stats[0] || { totalAssigned: 0, pending: 0, resolved: 0 },
            recentComplaints
        });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};