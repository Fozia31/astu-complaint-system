import Notification from "../models/notification.model";

export const getNotifications = async (req, res) => {
    try{
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            message:"Notifications retrieved successfully",
            notifications
        });



    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const markNotificationAsRead = async (req, res) => {
    try{
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { isRead: true },
            { new: true }
        );
        res.status(200).json({
            message:"Notification marked as read",
            notification
        });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}