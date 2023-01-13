import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

UsersSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  next();
});

UsersSchema.methods.comparePassword = function (password) {
  const user = this;
  const userObject = user.toObject();
  return bcrypt.compareSync(password, userObject.password);
};

UsersSchema.methods.createToken = function () {
  const { id, email } = this;
  return jwt.sign({ id: id, email: email }, "secret", { expiresIn: 600000 });
};

const UsersModel = model("users", UsersSchema);

export default UsersModel;
