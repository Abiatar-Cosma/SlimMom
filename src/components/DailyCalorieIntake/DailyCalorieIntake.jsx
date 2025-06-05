const DailyCalorieIntake = ({ data }) => {
  const { height, currentWeight, age, desiredWeight, bloodType } = data;

  const h = Number(height);
  const w = Number(currentWeight);
  const a = Number(age);
  const d = Number(desiredWeight);
  const b = Number(bloodType);

  const calculatedCalories = Math.round(
    10 * w + 6.25 * h - 5 * a + (b === 1 ? 5 : -161)
  );

  const recommendedFoodsByBloodType = {
  1: ["Wheat", "Corn", "Red meat", "Pork", "Smoked meats"],
  2: ["Tomatoes", "Eggplant", "Beef", "Shellfish", "Dairy"],
  3: ["Chicken", "Lentils", "Peanuts", "Tomatoes", "Corn"],
  4: ["Red meat", "Beans", "Buckwheat", "Corn", "Sunflower seeds"],
};

const notRecommendedFoods = recommendedFoodsByBloodType[b] || [];


  return (
    <div className="text-left space-y-4">
      <h2 className="text-xl font-bold">Your daily calorie intake:</h2>
      <p className="text-orange-600 text-3xl font-semibold">
        {calculatedCalories} kcal
      </p>

      <h3 className="text-lg font-medium mt-4">Food not recommended:</h3>
      <ul className="list-disc pl-5">
        {notRecommendedFoods.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailyCalorieIntake;
