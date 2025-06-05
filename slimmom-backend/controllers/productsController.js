const Food = require("../models/Food");

const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    const regex = new RegExp(query, "i");
    const results = await Food.find({ title: regex }).limit(20);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchProducts };
