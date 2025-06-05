import { useState } from "react";
import { searchProducts } from "../../api/productsApi";
import { addDiaryProduct } from "../../api/productsApi";

const DiaryAddProductForm = ({ onAdd, userBloodType = 1 }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !weight) return;

    const newProduct = {
      name: productName,
      weight: Number(weight),
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const saved = await addDiaryProduct(newProduct);
      onAdd(saved);
      setProductName("");
      setQuery("");
      setWeight("");
    } catch (err) {
      console.error("Eroare la salvare:", err);
    }
  };

  const handleQueryChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await searchProducts(value);
      const filtered = results.filter((item) => {
        const group = item.groupBloodNotAllowed;
        return !group || !group[userBloodType];
      });
      setSuggestions(filtered);
    } catch (err) {
      console.error("Eroare la căutare produse:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col sm:flex-row gap-4 items-center w-full"
    >
      <div className="w-full sm:w-1/2 relative">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Product name"
          className="border px-3 py-2 rounded w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-y-auto w-full">
            {suggestions.map((item) => (
              <li
                key={item._id}
                className="p-2 hover:bg-green-100 cursor-pointer"
                onClick={() => {
                  setProductName(item.title);
                  setQuery(item.title);
                  setSuggestions([]);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="g"
        className="border px-3 py-2 rounded w-full sm:w-1/4"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Add
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
