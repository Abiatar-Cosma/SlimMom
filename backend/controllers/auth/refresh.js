import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import { RequestError, createTokens } from "../../helpers/index.js";

const { REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    const { id } = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);

    const user = await User.findById(id);
    if (!user || user.refreshToken !== token) {
      throw RequestError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = await createTokens(id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Refresh error:", error.message);
    if (!error.status) {
      error.status = 401;
    }
    throw error;
  }
};

export default refresh;
