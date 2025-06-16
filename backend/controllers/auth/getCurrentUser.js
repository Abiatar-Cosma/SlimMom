import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw RequestError(401, "No access token");
    }

    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    if (!payload?.id) {
      throw RequestError(401, "Invalid access token payload");
    }

    const user = await User.findById(payload.id).select("email name dailyDiet");
    if (!user) {
      throw RequestError(401, "User not found");
    }

    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
      },
      dailyDiet: user.dailyDiet,
    });
  } catch (error) {
    console.error("GetCurrentUser error:", error.message);
    if (!error.status) {
      error.status = 401;
      error.message = "Invalid or expired access token";
    }
    res.status(error.status).json({ message: error.message });
  }
};

export default getCurrentUser;
