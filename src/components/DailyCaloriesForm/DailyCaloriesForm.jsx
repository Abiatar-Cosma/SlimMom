import { useState } from "react";

const DailyCaloriesForm = ({ onSubmit }) => {
  const [height, setHeight] = useState("");
  const [desiredWeight, setDesiredWeight] = useState("");
  const [age, setAge] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [bloodType, setBloodType] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      height: Number(height),
      desiredWeight: Number(desiredWeight),
      age: Number(age),
      currentWeight: Number(currentWeight),
      bloodType: Number(bloodType),
    };

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Calculate your daily calorie intake right now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Height *"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Desired weight *"
          value={desiredWeight}
          onChange={(e) => setDesiredWeight(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Age *"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Current weight *"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Blood type *</label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((type) => (
            <label key={type} className="flex items-center space-x-1">
              <input
                type="radio"
                value={type}
                checked={bloodType === String(type)}
                onChange={(e) => setBloodType(e.target.value)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded mt-4 block mx-auto"
      >
        Start losing weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
