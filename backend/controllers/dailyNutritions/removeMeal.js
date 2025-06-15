import { DailyNutrition } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const removeMeal = async (req, res) => {
  const { mealId } = req.params;

  const result = await DailyNutrition.findByIdAndRemove(mealId);

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({ message: "Meal deleted" });
};

export default removeMeal;
