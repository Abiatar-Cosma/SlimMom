import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addDiaryEntry,
  getDiaryEntriesByDate,
  deleteDiaryEntry,
} from "../controllers/diaryController.js";

const router = express.Router();

router.get("/", authenticate, getDiaryEntriesByDate);
router.post("/", authenticate, addDiaryEntry);

router.delete("/:id", authenticate, deleteDiaryEntry);

export default router;
