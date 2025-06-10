import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";

dotenv.config();
const __dirname = path.resolve();

const importProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const filePath = path.join(__dirname, "scripts", "products.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const total = data.length;

    // ✅ Filtrăm doar produsele complete și corecte
    const validData = data.filter(
      (item) =>
        item.categories &&
        item.weight &&
        item.title &&
        typeof item.calories === "number" &&
        Array.isArray(item.groupBloodNotAllowed)
    );

    const invalidData = data.filter(
      (item) =>
        !item.categories ||
        !item.weight ||
        !item.title ||
        typeof item.calories !== "number" ||
        !Array.isArray(item.groupBloodNotAllowed)
    );

    const invalidCount = total - validData.length;

    console.log(`📦 Total produse în fișier: ${total}`);
    console.log(`✅ Produse valide: ${validData.length}`);
    console.log(`⚠️ Produse invalide: ${invalidCount}`);

    // 🧹 Ștergem vechile produse
    await Product.deleteMany();

    // 🧾 Inserăm doar ce e valid
    await Product.insertMany(validData);

    // 💾 (Opțional) salvăm produsele invalide
    const invalidPath = path.join(__dirname, "scripts", "invalidProducts.json");
    fs.writeFileSync(invalidPath, JSON.stringify(invalidData, null, 2));

    console.log("✅ Produsele au fost importate cu succes!");
    process.exit();
  } catch (error) {
    console.error("❌ Eroare la import:", error.message);
    process.exit(1);
  }
};

importProducts();
