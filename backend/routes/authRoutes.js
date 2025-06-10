import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { registerSchema } from "../schemas/userSchemas.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", loginUser);
router.get(
  "/current",
  validateBody(registerSchema),
  authenticate,
  getCurrentUser
);
router.get("/logout", logoutUser);

export default router;
