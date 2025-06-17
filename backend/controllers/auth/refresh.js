import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import { RequestError, createTokens } from "../../helpers/index.js";

const { REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw RequestError(401, "Missing refresh token");
    }

    let payload;
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    } catch (err) {
      throw RequestError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) {
      throw RequestError(401, "Refresh token mismatch or user not found");
    }

    const { accessToken, refreshToken } = await createTokens(user._id);

    await User.findByIdAndUpdate(user._id, {
      accessToken,
      refreshToken,
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Token refreshed" });
  } catch (error) {
    console.error("Refresh error:", error.message);
    if (!error.status) {
      error.status = 401;
    }
    throw error;
  }
};

export default refresh;
