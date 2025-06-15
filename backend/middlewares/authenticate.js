import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { RequestError } from "../helpers/index.js";

const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw RequestError(401);
    }

    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.accessToken || user.accessToken !== token) {
      throw RequestError(401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

export default authenticate;
