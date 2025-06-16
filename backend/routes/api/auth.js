import express from "express";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";

import { registerSchema, loginSchema } from "../../schemas/index.js";

import * as ctrl from "../../controllers/index.js";

const router = express.Router();

// 🔐 Înregistrare
router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

// 🔐 Login (salvează tokenurile în cookie-uri)
router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.post("/refresh", ctrlWrapper(ctrl.refresh));

// 🙋‍♂️ Get current user – cu accessToken din cookie
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

// 🚪 Logout – șterge cookie-urile
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

export default router;
