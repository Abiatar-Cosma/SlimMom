import Product from "../models/Product.js";
import { User } from "../models/User.js";
import { calculateCalories } from "../utils/calculations.js";

// Funcție pentru ruta publică (GET)
export const getPublicDailyIntake = async (req, res) => {
  try {
    const { height, age, weight, bloodType } = req.query;

    if (!height || !age || !weight || !bloodType) {
      return res.status(400).json({ message: "Toate câmpurile sunt necesare" });
    }

    const personalData = {
      height: Number(height),
      age: Number(age),
      weight: Number(weight),
      bloodType: Number(bloodType),
    };

    const dailyCalories = calculateCalories(personalData);

    const notAllowedProducts = await Product.find({
      [`groupBloodNotAllowed.${bloodType}`]: true,
    }).select("title categories -_id");

    res.status(200).json({ dailyCalories, notAllowedProducts });
  } catch (error) {
    res.status(500).json({ message: "Eroare server", error: error.message });
  }
};

// Funcție pentru ruta privată (POST)
export const saveDailyIntake = async (req, res) => {
  const { height, age, weight, bloodType } = req.body;

  if (!height || !age || !weight || bloodType === undefined) {
    return res
      .status(400)
      .json({ message: "Toate câmpurile sunt obligatorii" });
  }

  const dailyCalorieIntake = Math.round(
    10 * weight + 6.25 * height - 5 * age - 161
  );

  const personalData = {
    height,
    age,
    weight,
    bloodType,
    dailyCalorieIntake,
  };

  await User.findByIdAndUpdate(req.user.id, { personalData });

  res.status(200).json({
    message: "✅ Datele au fost salvate",
    personalData,
  });
};

export const getSavedDailyIntake = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.personalData) {
      return res
        .status(404)
        .json({ message: "Datele nu au fost încă salvate." });
    }

    res.status(200).json({
      personalData: user.personalData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la extragerea datelor", error: error.message });
  }
};
