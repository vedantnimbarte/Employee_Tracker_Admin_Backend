import { model, Schema } from "mongoose";

const HolidaySchema = new Schema({
  name: { type: String, required: true },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  type: { type: String, enum: ["FULL", "HALF"] },
});

const HolidayModel = model("holidays", HolidaySchema);

export default HolidayModel;
