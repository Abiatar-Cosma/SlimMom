import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import dailyRoutes from "./routes/dailyRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Conectare DB
connectDB();

// Rute
// Rute
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/private", dailyRoutes);
app.use("/api/diary", diaryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
