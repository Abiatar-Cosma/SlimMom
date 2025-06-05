const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
