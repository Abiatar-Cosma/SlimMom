import { DailyNutrition } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const getDailyMeals = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;

  if (!date) {
    throw RequestError(400, "Date is required");
  }

  // Transformă data primită în obiect Date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Caută înregistrările în intervalul zilei
  const result = await DailyNutrition.find({
    owner: _id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (!result || result.length === 0) {
    throw RequestError(404, "Not found");
  }

  res.json(result);
};

export default getDailyMeals;
