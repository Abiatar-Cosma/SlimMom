import mongoose from "mongoose";

const diaryEntrySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // format: "YYYY-MM-DD"
      required: true,
    },
    product: {
      title: { type: String, required: true },
      calories: { type: Number, required: true },
      category: { type: String, required: true },
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const DiaryEntry = mongoose.model("DiaryEntry", diaryEntrySchema);
