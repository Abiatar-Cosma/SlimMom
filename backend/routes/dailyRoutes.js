import express from "express";
import { saveDailyIntake } from "../controllers/dailyIntakeController.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  getPublicDailyIntake,
  getSavedDailyIntake,
} from "../controllers/dailyIntakeController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { dailyIntakeJoiSchema } from "../schemas/dailyIntakeSchema.js";

const router = express.Router();

router.get("/public/daily-intake", getPublicDailyIntake);
router.post(
  "/daily-intake",
  authenticate,
  validateBody(dailyIntakeJoiSchema),
  saveDailyIntake
);

export default router;
