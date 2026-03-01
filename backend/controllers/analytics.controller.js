import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";


export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalCount, 
            resolvedCount, 
            avgTimeResult, 
            categoryStats, 
            monthlyStats, 
            userCount
        ] = await Promise.all([
            Complaint.countDocuments(),
            Complaint.countDocuments({ status: "resolved" }),
            Complaint.aggregate([
                { $match: { status: "resolved", resolvedAt: { $exists: true } } },
                {
                    $group: {
                        _id: null,
                        avgTime: { $avg: { $divide: [{ $subtract: ["$resolvedAt", "$createdAt"] }, 86400000] } }
                    }
                }
            ]),
            Complaint.aggregate([
                { $group: { _id: "$category", total: { $sum: 1 } } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "cat" } },
                { $unwind: "$cat" },
                { $project: { _id: 0, category: "$cat.name", total: 1 } }
            ]),
            Complaint.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        total: { $sum: 1 }
                    }
                },
                { $sort: { "_id": 1 } },
                { $limit: 6 }
            ]),
            User.countDocuments()
        ]);

        res.status(200).json({
            stats: {
                totalComplaints: totalCount,
                resolutionRate: totalCount > 0 ? (resolvedCount / totalCount) * 100 : 0,
                averageResolutionTime: avgTimeResult[0]?.avgTime || 0,
                totalUsers: userCount
            },
            categoryData: categoryStats,
            monthlyData: monthlyStats
        });
    } catch (error) {
        res.status(500).json({ message: "Analytics Error", error: error.message });
    }
};


export const getTotalComplaints = async (req, res) => {
    try {
        const count = await Complaint.countDocuments();
        res.status(200).json({ totalComplaints: count });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getResolutionRate = async (req, res) => {
    try {
        const total = await Complaint.countDocuments();
        const resolved = await Complaint.countDocuments({ status: "resolved" });
        res.status(200).json({ resolutionRate: total > 0 ? (resolved / total) * 100 : 0 });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getAverageResolutionTime = async (req, res) => {
    try {
        const avg = await Complaint.aggregate([
            { $match: { status: "resolved", resolvedAt: { $exists: true } } },
            { $group: { _id: null, avgTime: { $avg: { $divide: [{ $subtract: ["$resolvedAt", "$createdAt"] }, 86400000] } } } }
        ]);
        res.status(200).json({ averageResolutionTime: avg[0]?.avgTime || 0 });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getComplaintsByCategory = async (req, res) => {
    try {
        const complaintsByCategory = await Complaint.aggregate([
            { $group: { _id: "$category", total: { $sum: 1 } } },
            { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "cat" } },
            { $unwind: "$cat" },
            { $project: { _id: 0, category: "$cat.name", total: 1 } }
        ]);
        res.status(200).json({ data: complaintsByCategory });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getMonthlyComplaints = async (req, res) => {
    try {
        const data = await Complaint.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, total: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);
        res.status(200).json({ data });
    } catch (error) { res.status(500).json({ message: error.message }); }
};