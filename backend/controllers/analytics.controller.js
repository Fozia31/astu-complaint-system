// controllers/analytics.controller.js
import Complaint from "../models/complaint.model"; 

export const getTotalComplaints = async (req, res) => {
    try{
        const totalComplaints = await Complaint.countDocuments();
    res.status(200).json({
        message:"Total complaints retrieved successfully",
        totalComplaints: totalComplaints.length
    });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const getResolutionRate = async (req, res) => {
    try{
        const totalComplaints = await Complaint.countDocuments();
        const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" });


        const resolutionRate = totalComplaints > 0 ? (resolvedComplaints / totalComplaints * 100) : 0;

        res.status(200).json({
            message:"Resolution rate retrieved successfully",
            resolutionRate: resolutionRate
        });



    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
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

export const getAverageResolutionTime = async (req, res) => {
    try{
        const avgResolutionTime = await Complaint.aggregate([
            { $match: { status: "resolved" } },
            {
                $project: {
                    getAverageResolutionTime: {
                        $divide: [
                            { $subtract: ["$resolvedAt", "$createdAt"] },
                            1000 * 60 * 60 * 24
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageResolutionTime: { $avg: "$getAverageResolutionTime" }
                }
            }
        ]);

        return res.status(200).json({
            message:"Average resolution time retrieved successfully",
            averageResolutionTime: avgResolutionTime[0] ? avgResolutionTime[0].averageResolutionTime : 0
        });
     
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}