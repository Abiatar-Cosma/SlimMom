import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    const fakeUserId = "user-" + btoa(email); // un ID unic de test local
    localStorage.setItem("userId", fakeUserId); // 🔹 Salvăm ID-ul local

    dispatch(login(email)); // salvezi email-ul în redux
    navigate("/diary");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center text-green-700">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
