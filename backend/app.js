import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/api/auth.js";
import productsRouter from "./routes/api/products.js";
import dailyNutritionsRouter from "./routes/api/dailyNutritions.js";
import dailyIntakeRouter from "./routes/api/dailyIntakeRoutes.js";

dotenv.config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/dailynutritions", dailyNutritionsRouter);
app.use("/api/daily-intake", dailyIntakeRouter);

app.use("/public", express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
