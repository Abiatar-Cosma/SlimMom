import { User } from "../../models/user.js";

const logout = async (req, res) => {
  const { _id } = req.user;

  // Opțional: ștergem tokenii salvați în DB
  await User.findByIdAndUpdate(_id, {
    accessToken: "",
    refreshToken: "",
  });

  // Curățăm cookie-urile de pe client
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logout success" });
};

export default logout;
