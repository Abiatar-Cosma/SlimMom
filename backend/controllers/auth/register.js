import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.verify) {
    throw RequestError(409, "Email in use");
  }

  if (user && !user.verify) {
    return res.status(201).json({
      user: { name: user.name, email: user.email },
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    user: { name: result.name, email: result.email },
  });
};

export default register;
