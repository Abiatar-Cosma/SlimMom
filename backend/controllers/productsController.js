import Product from "../models/Product.js";

// 🟢 Returnează toate produsele
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Eroare la getAllProducts:", error.message);
    res.status(500).json({ message: "Eroare internă server" });
  }
};

// 🟢 Căutare produse după titlu (query param: ?q=lapte)
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Parametrul 'q' este necesar" });
    }

    const regex = new RegExp(query, "i"); // i = insensitive
    const results = await Product.find({
      $or: [
        { title: { $regex: regex } }, // dacă title e string
        { "title.en": { $regex: regex } }, // dacă title e obiect
        { "title.ua": { $regex: regex } },
        { "title.ru": { $regex: regex } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Eroare la searchProducts:", error.message);
    res.status(500).json({ message: "Eroare internă server" });
  }
};
