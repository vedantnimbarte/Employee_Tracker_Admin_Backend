import mongoose, { model, Schema } from "mongoose";
import logger from "../common/logger";

const TimeSheetSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },

    status: {
      type: String,
      enum: ["LOGIN", "BREAK_IN", "BREAK_OUT", "LOGOUT"],
    },
    work_note: { type: String },
    work_hours: { type: Number, default: 0 },
    break_hours: { type: Number, default: 0 },
    start_date: { type: Date },
    end_date: { type: Date },
    login_time: { type: Date },
    logout_time: { type: Date },
    created_at: { type: Date, default: Date },
    updated_at: { type: Date, default: Date },
  },
  { versionKey: false }
);

const TimeSheetModel = model("time_sheet", TimeSheetSchema);

TimeSheetSchema.pre("save", function (next) {
  const timeData = this;
  logger.info(JSON.stringify({ timeData }));
  next();
});

export default TimeSheetModel;
