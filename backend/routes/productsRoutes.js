import express from "express";
import { getAllProducts, searchProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.get("/searchProducts", searchProducts);

export default router;
