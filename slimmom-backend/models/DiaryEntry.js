const mongoose = require("mongoose");

const diaryEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
  calories: { type: Number },
  groupBloodNotAllowed: [Boolean],
  notAllowed: { type: Boolean, default: false },
});

module.exports = mongoose.model("DiaryEntry", diaryEntrySchema);
