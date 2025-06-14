import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BACKEND_URL || "http://localhost:3000/api",
});

export const setToken = (token = "") => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const signup = async (data) => {
  const result = await instance.post("/users/signup", data);
  return result.data;
};

export const login = async (data) => {
  const result = await instance.post("/users/login", data);
  setToken(result.data.accessToken);
  return result.data;
};

export const refresh = async (data) => {
  const result = await instance.post("/users/refresh", data);
  setToken(result.data.accessToken);
  return result.data;
};

export const logout = async () => {
  const result = await instance.get("/users/logout");
  setToken("");
  return result.data;
};

export const getCurrentUser = async () => {
  const result = await instance.get("/users/current");
  return result.data;
};

export const getActivationKey = async (email) => {
  const result = await instance.get(`/users/key/${email}`);
  return result.data;
};

export const getKeyVerify = async (key) => {
  const result = await instance.get(`/users/verify/${key}`);
  return result.data;
};

export const saveNewPassword = async (data) => {
  const result = await instance.patch(`/users/password`, data);
  return result.data;
};

export const getCalorieIntake = async (payload) => {
  const result = await instance.post(`/daily-intake`, payload);
  return result.data;
};

export const getCalorieIntakeForUser = async (payload) => {
  const result = await instance.post(`/daily-intake/user`, payload);
  return result.data;
};

export default instance;
