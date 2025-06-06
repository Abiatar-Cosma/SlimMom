const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://abiatarcosma:slimmom1243-1243@slimmom.ikczot1.mongodb.net/slimmom?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB error:", err));

const Food = require("./models/Food");

const filePath = path.join(__dirname, "products.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const cleanedData = data
  .map(({ _id, __v, ...rest }) => rest)
  .filter((item) => item.calories !== undefined && item.title);

async function importData() {
  try {
    await Food.deleteMany();
    await Food.insertMany(cleanedData);
    console.log("✅ Produsele au fost importate cu succes!");
  } catch (err) {
    console.error("❌ Eroare la import:", err);
  } finally {
    mongoose.connection.close();
  }
}

importData();
