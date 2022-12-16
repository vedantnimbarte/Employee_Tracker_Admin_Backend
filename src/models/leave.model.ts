import mongoose, { model, Schema } from "mongoose";
import UsersModel from "./user.model";

const LeaveSchema = new Schema(
  {
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    description: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UsersModel,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UsersModel,
    },
    isPaid: { type: Boolean, default: false },
    status: { type: String, enum: ["APPROVED", "REJECTED", "IN_PROGRESS"] },
    type: { type: String, enum: ["FULL", "HALF"], required: true },
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true },
  },
  { versionKey: false }
);

const LeaveModel = model("leaves", LeaveSchema);

export default LeaveModel;
