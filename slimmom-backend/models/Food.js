const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  weight: { type: Number, required: true },
  categories: { type: String },
  groupBloodNotAllowed: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model("Food", foodSchema);
