// backend/controllers/authController.js
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email deja înregistrat" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Utilizator creat cu succes",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Eroare la înregistrare:", error.message);
    res.status(500).json({ message: "Eroare la server" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verificăm dacă userul există
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email sau parolă incorectă" });
    }

    // verificăm parola
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email sau parolă incorectă" });
    }

    // generăm JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Autentificare reușită",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Eroare la login:", error.message);
    res.status(500).json({ message: "Eroare la server" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { id, email } = req.user; // extras din JWT
    res.status(200).json({
      user: {
        id,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Eroare la obținerea userului" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // În variantă simplă nu avem refreshToken salvat, deci doar răspundem
    res.status(200).json({ message: "Deconectare reușită" });
  } catch (error) {
    res.status(500).json({ message: "Eroare la logout" });
  }
};
