import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 🔧 Setup pentru __dirname în ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🗂️ Calea către fișierul JSON cu produse
const filePath = path.join(__dirname, "products.json");

// 📖 Citește fișierul
const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// 🧹 Curăță fiecare produs — păstrează doar _id în format string
const cleaned = raw.map((p) => ({
  ...p,
  _id: p._id?.$oid || undefined,
}));

// 💾 Scrie fișierul înapoi curățat
fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2));

// ✅ Succes
console.log("✅ products.json curățat");
