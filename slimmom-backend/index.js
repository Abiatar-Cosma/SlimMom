const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRouter = require("./routes/products");
const DiaryEntry = require("./models/DiaryEntry");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectare MongoDB
mongoose
  .connect(
    "mongodb+srv://abiatarcosma:slimmom1243-1243@slimmom.ikczot1.mongodb.net/slimmom?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Rute
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("SlimMom API running");
});

// ✅ POST /api/diary
app.post("/api/diary", async (req, res) => {
  const {
    name,
    weight,
    date,
    userId,
    calories,
    groupBloodNotAllowed,
    notAllowed,
  } = req.body;

  if (!userId || !date || !name || !weight) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEntry = await DiaryEntry.create({
      name,
      weight,
      date,
      userId,
      calories,
      groupBloodNotAllowed,
      notAllowed,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("❌ Error saving entry:", err);
    res.status(400).json({ message: "Error saving entry" });
  }
});

// ✅ GET /api/diary?date=...&userId=...
app.get("/api/diary", async (req, res) => {
  const { date, userId } = req.query;

  if (!date || !userId) {
    return res.status(400).json({ message: "Missing date or userId" });
  }

  try {
    const entries = await DiaryEntry.find({ date, userId });
    res.status(200).json(entries);
  } catch (err) {
    console.error("❌ Error fetching entries:", err);
    res.status(500).json({ message: "Error fetching entries" });
  }
});

app.delete("/api/diary/:id", async (req, res) => {
  try {
    await DiaryEntry.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Eroare la ștergere:", err);
    res.status(500).json({ message: "Eroare la ștergere" });
  }
});


// Pornire server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
