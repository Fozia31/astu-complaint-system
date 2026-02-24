import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

} ,{timestamps:true});

const Notification = mongoose.model("Notification",categorySchema);

export default Notification;