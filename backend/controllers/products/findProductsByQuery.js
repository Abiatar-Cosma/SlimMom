import { Product } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const findProductsByQuery = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  const result = await Product.find(
    { title: { $regex: q, $options: "i" } },
    { title: 1, weight: 1, calories: 1 }
  ).limit(20);

  if (result.length < 1) {
    throw RequestError(404, "Not found");
  }

  res.json(result);
};

export default findProductsByQuery;
