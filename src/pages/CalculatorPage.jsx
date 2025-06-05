import { useState } from "react";
import DailyCaloriesForm from "../components/DailyCaloriesForm/DailyCaloriesForm";
import DailyCalorieIntake from "../components/DailyCalorieIntake/DailyCalorieIntake";
import Modal from "../components/Modal/Modal";

const CalculatorPage = () => {
  const [modalData, setModalData] = useState(null);

  const handleFormSubmit = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Calculate your daily calorie intake
      </h1>

      <DailyCaloriesForm onSubmit={handleFormSubmit} />

      {modalData && (
        <Modal onClose={closeModal}>
          <DailyCalorieIntake data={modalData} />
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;
