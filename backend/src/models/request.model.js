import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "fulfilled"],
    default: "pending",
  }
},{timestamps:true});

export const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
