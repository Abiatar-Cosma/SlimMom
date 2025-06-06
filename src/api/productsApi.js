import axios from "axios";

// Poți folosi o singură constantă pentru baza API-ului
const API_BASE = "http://localhost:5000/api";

// 🔍 Căutare produse pentru autocomplete
export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE}/products`, {
    params: { query },
  });
  return response.data;
};

// ➕ Adăugare produs în jurnal
export const addDiaryProduct = async (product) => {
  const response = await axios.post(`${API_BASE}/diary`, product);
  return response.data;
};

export const getDiaryProductsByDate = async (date, userId) => {
  const res = await axios.get(`${API_BASE}/diary`, {
    params: { date, userId },
  });
  return res.data;
};

export const deleteDiaryProduct = async (id) => {
  await axios.delete(`http://localhost:5000/api/diary/${id}`);
};
