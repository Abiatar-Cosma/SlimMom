import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { RequestError, createTokens } from "../../helpers/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Current email is not registered");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  // opțional: dacă vrei să ții cont de confirmare email, altfel poți ignora
  // if (!user.verify) {
  //   throw RequestError(401, "Email address is not verified");
  // }

  const { accessToken, refreshToken } = await createTokens(user._id);

  res.json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
    },
    dailyDiet: user.dailyDiet,
  });
};

export default login;
