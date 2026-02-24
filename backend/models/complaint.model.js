import mongoose from "mongoose";    

const complaintSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status:{
        type:String,
        enum:["open","in-progress","resolved"],
        default:"open"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attachments: [
      {
        url: String,
        public_id: String,
      },
    ],
    remarks: [
      {
        message: String,
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolvedAt: {
      type: Date,
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
   
},{timestamps:true});

const Complaint = mongoose.model("Complaint",complaintSchema);

export default Complaint;