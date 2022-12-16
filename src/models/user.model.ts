import { model, Schema } from "mongoose";

const UsersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile_no: { type: String },
    designation: { type: String },
    password: { type: String },
    date_of_birth: { type: String },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    address: { type: String },
    profile_picture: { type: String },
    role: { type: String, enum: ["ADMIN", "HR", "USER"] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const UsersModel = model("users", UsersSchema);

export default UsersModel;
