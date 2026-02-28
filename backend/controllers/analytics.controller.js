// controllers/analytics.controller.js
import Complaint from "../models/complaint.model.js";

export const getTotalComplaints = async (req, res) => {
    try {
        const totalComplaints = await Complaint.countDocuments(); // This is a number
        res.status(200).json({
            message: "Total complaints retrieved successfully",
            totalComplaints: totalComplaints // Remove .length
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// analytics.controller.js

export const getResolutionRate = async (req, res) => {
    try {
        const total = await Complaint.countDocuments();
        const resolved = await Complaint.countDocuments({ status: "resolved" });
        // Ensure we send a field named 'resolutionRate'
        const rate = total > 0 ? (resolved / total * 100) : 0;

        res.status(200).json({
            message: "Success",
            resolutionRate: rate // This must match the frontend key
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
}

export const getAverageResolutionTime = async (req, res) => {
    try {
        const avg = await Complaint.aggregate([
            { $match: { status: "resolved" } },
            {
                $group: {
                    _id: null,
                    avgTime: { $avg: { $divide: [{ $subtract: ["$resolvedAt", "$createdAt"] }, 86400000] } }
                }
            }
        ]);

        res.status(200).json({
            message: "Success",
            averageResolutionTime: avg[0]?.avgTime || 0 // Ensure this key exists
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
}

    export const getComplaintsByCategory = async (req, res) => {
        try{
            const complaintsByCategory = await Complaint.aggregate([
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                },
                { $unwind: "$categoryDetails" },
                    {
                        $project: {
                            _id: 0,
                            category: "$categoryDetails.name",
                            total: 1
                        }
                }
            ]);

            return res.status(200).json({
                message:"Complaints by category retrieved successfully",
                data: complaintsByCategory
            })
            
        }catch(error){
            res.status(500).json({message:"Server Error",error:error.message});
        }
    }

export const getMonthlyComplaints = async (req, res) => {
    try{
        const monthlyComplaints = await Complaint.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: 1 }
                }
            },
             { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        return res.status(200).json({
            message:"Monthly complaints retrieved successfully",
            data: monthlyComplaints
        });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

