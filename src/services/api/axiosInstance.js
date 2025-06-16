// src/services/api/axiosInstance.js
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BACKEND_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
