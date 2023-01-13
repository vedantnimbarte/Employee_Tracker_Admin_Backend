import mongoose, { model, Schema } from "mongoose";
import logger from "../common/logger";

const TimeSheetSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },

    status: {
      type: String,
      enum: ["LOGGED_IN", "BREAK_IN", "BREAK_OUT", "LOGGED_OUT"],
    },
    work_note: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
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
