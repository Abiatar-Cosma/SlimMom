import mongoose from "mongoose";
import handleSaveErrors from "../helpers/handleSaveErrors.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    personalData: {
      type: Object,
      default: null,
    },
    dailyDiet: {
      type: Object,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

export const User = model("user", userSchema);
