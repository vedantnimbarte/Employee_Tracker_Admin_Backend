import mongoose, { model, Schema } from "mongoose";

const TimeSheetSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    activity: [
      {
        activity_time: { type: Date, default: Date.now, required: true },
        activity_type: {
          type: String,
          enum: ["BREAK_IN", "BREAK_OUT", "WORK_IN", "WORK_OUT"],
        },
      },
    ],
    status: { type: String, enum: ["LOGGED_IN", "BREAK", "LOGGED_OUT"] },
    work_note: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const TimeSheetModel = model("time_sheet", TimeSheetSchema);

export default TimeSheetModel;
