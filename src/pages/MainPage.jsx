import { useState } from "react";
import DailyCaloriesForm from "../components/DailyCaloriesForm/DailyCaloriesForm";
import Modal from "../components/Modal/Modal";
import DailyCalorieIntake from "../components/DailyCalorieIntake/DailyCalorieIntake";

const MainPage = () => {
  const [modalData, setModalData] = useState(null);

  const handleFormSubmit = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
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

export default MainPage;
