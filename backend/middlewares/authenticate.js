import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Acces neautorizat" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Token invalid" });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid sau expirat" });
  }
};
