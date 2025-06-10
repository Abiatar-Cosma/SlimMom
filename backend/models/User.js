import mongoose from "mongoose";
import handleSaveErrors from "../helpers/handleSaveErrors.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  password: { type: String, required: [true, "Password is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  accessToken: { type: String, default: "" },
  refreshToken: { type: String, default: "" },
  personalData: { type: Object, default: null },
  dailyDiet: { type: Object, default: null },
  key: { type: String, default: "" },
  verifiedKey: { type: Boolean, default: false },
  verify: { type: Boolean, default: false },
  verificationToken: { type: String, required: [true, "Verify token is required"] },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrors);

export const User = mongoose.model("User", userSchema);
