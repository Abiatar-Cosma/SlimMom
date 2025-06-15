import express from "express";

import { validateBody, authenticate } from "../../middlewares/index.js";

import { ctrlWrapper } from "../../helpers/index.js";

import {
  registerSchema,
  loginSchema,
  refreshSchema,
} from "../../schemas/index.js";

import * as ctrl from "../../controllers/index.js";

const router = express.Router();

// 🔐 Înregistrare
router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

// 🔐 Login
router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

// 🔁 Refresh Token
router.post("/refresh", validateBody(refreshSchema), ctrlWrapper(ctrl.refresh));

// 🙋‍♂️ Get Current User
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

// 🚪 Logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

export default router;
