import axios from "axios";

const API_URL = "http://localhost:5000/api/products";
const API_BASE = "http://localhost:5000/api";

export const searchProducts = async (query) => {
  const res = await axios.get(API_URL, {
    params: { query },
  });
  return res.data;
};

export const addDiaryProduct = async (product) => {
  const response = await axios.post(`${API_BASE}/diary`, product);
  return response.data;
};
