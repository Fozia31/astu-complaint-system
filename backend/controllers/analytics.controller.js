import Category from "../models/category.model";   
import Complaint from "../models/complaint.model"; 

export const getTotalComplaints = async (req, res) => {
    try{
        const totalComplaints = await Complaint.aggregate([
            {
                $lookup: {
                    from: "complaints",
                    localField: "_id",
                    foreignField: "category",
                    as: "complaints"
                }
            },

    ])
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
        const resolvedComplaints = await Complaint.aggregate([
            {
                $lookup: {
                    from: "complaints",
                    localField: "_id",
                    foreignField: "category",
                    as: "complaints"
                }
            },
            {
                $unwind: "$complaints"
            },
            {
                $match: {
                    "complaints.status": "Resolved"
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalComplaints = await Category.aggregate([
            {
                $lookup: {
                    from: "complaints",
                    localField: "_id",
                    foreignField: "category",
                    as: "complaints"

                }
            },
            {
                $unwind: "$complaints"
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        const resolutionRate = totalComplaints.length > 0 ? (resolvedComplaints[0]?.count || 0) / totalComplaints[0]?.count * 100 : 0;
        res.status(200).json({
            message:"Resolution rate retrieved successfully",
            resolutionRate: resolutionRate
        });



    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}