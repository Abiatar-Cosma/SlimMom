const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/productsController");

router.get("/", searchProducts);

module.exports = router;
