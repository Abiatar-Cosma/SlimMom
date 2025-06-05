import { useState } from "react";
import { format } from "date-fns";
import DiaryDateCalendar from "../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import RightSidebar from "../components/RightSidebar/RightSidebar";

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [products, setProducts] = useState([]);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const filteredProducts = products.filter((p) => p.date === formattedDate);

  const handleAddProduct = (product) => {
    const productWithDate = {
      ...product,
      date: formattedDate,
    };
    setProducts((prev) => [...prev, productWithDate]);
  };

  const handleDeleteProduct = (indexToDelete) => {
    setProducts((prev) => prev.filter((_, index) => index !== indexToDelete));
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
          <DiaryAddProductForm onAdd={handleAddProduct} />
          <DiaryProductsList
            items={filteredProducts}
            onDelete={handleDeleteProduct}
          />
        </div>

        <div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
