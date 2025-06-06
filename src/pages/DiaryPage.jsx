import { useState, useEffect } from "react";
import { format } from "date-fns";
import DiaryDateCalendar from "../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import { getDiaryProductsByDate } from "../api/productsApi";
import { deleteDiaryProduct } from "../api/productsApi";

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [products, setProducts] = useState([]);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const data = await getDiaryProductsByDate(formattedDate, userId);
      setProducts(data);
    } catch (err) {
      console.error("Eroare la fetch:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [formattedDate]);

  const handleAddProduct = async () => {
    await fetchProducts();
  };

  const handleDeleteProduct = async (idToDelete) => {
    try {
      await deleteDiaryProduct(idToDelete);
      fetchProducts(); // reîncarcă lista după ștergere
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Diary
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DiaryDateCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <DiaryAddProductForm
            onAdd={handleAddProduct}
            selectedDate={selectedDate}
          />
          <DiaryProductsList items={products} onDelete={handleDeleteProduct} />
        </div>
        <div>
          <RightSidebar products={products} />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
