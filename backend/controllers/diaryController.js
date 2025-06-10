import { DiaryEntry } from "../models/DiaryEntry.js";
import Product from "../models/Product.js";

export const addDiaryEntry = async (req, res) => {
  try {
    const { date, productId, weight } = req.body;
    const userId = req.user.id;

    if (!date || !productId || !weight) {
      return res
        .status(400)
        .json({ message: "Toate câmpurile sunt obligatorii." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produsul nu a fost găsit." });
    }

    const caloriesPerGram = product.calories / 100;
    const totalCalories = Math.round(caloriesPerGram * weight);

    const diaryEntry = new DiaryEntry({
      owner: userId,
      date,
      product: {
        title: product.title,
        calories: totalCalories,
        category: product.categories,
      },
      weight,
    });

    await diaryEntry.save();

    res.status(201).json({
      message: "✅ Produs adăugat în jurnal.",
      entry: diaryEntry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la salvare", error: error.message });
  }
};

export const getDiaryEntriesByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: "Parametrul 'date' este necesar." });
    }

    const entries = await DiaryEntry.find({ owner: userId, date });

    res.status(200).json({
      date,
      total: entries.length,
      entries,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la extragerea datelor", error: error.message });
  }
};

export const deleteDiaryEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const entry = await DiaryEntry.findOne({ _id: id, owner: userId });

    if (!entry) {
      return res.status(404).json({ message: "Intrarea nu a fost găsită sau nu aparține utilizatorului." });
    }

    await DiaryEntry.findByIdAndDelete(id);

    res.status(200).json({ message: "✅ Intrarea a fost ștearsă cu succes." });
  } catch (error) {
    res.status(500).json({ message: "Eroare la ștergere", error: error.message });
  }
};
