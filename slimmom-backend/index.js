const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const productsRouter = require("./routes/products");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/slimmom")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("SlimMom API running");
});

app.post("/api/diary", async (req, res) => {
  const { name, weight, date } = req.body;
  try {
    const newProduct = await Product.create({ name, weight, date });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error saving product" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
