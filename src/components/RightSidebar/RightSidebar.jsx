const RightSidebar = ({ products = [] }) => {
  const userBloodType = Number(localStorage.getItem("userBloodType")) || 1;

  const totalConsumed = products.reduce((total, p) => {
    const kcalPer100g = p.calories || 0;
    return total + (kcalPer100g * p.weight) / 100;
  }, 0);

  const recommended =
    Number(localStorage.getItem("recommendedCalories")) || 1500;

  const remaining = Math.max(recommended - totalConsumed, 0);

  const forbiddenProducts = products
    .filter((p) => {
      const group = p.groupBloodNotAllowed;
      return group?.[userBloodType] === true;
    })
    .map((p) => p.name || p.title);

  return (
    <aside className="bg-white p-4 rounded shadow w-full max-w-xs space-y-4">
      <h2 className="text-lg font-bold text-green-700">Summary for Today</h2>

      <ul className="space-y-2 text-sm">
        <li>
          <strong>Recommended:</strong> {recommended.toFixed(0)} kcal
        </li>
        <li>
          <strong>Consumed:</strong> {totalConsumed.toFixed(0)} kcal
        </li>
        <li>
          <strong>Remaining:</strong> {remaining.toFixed(0)} kcal
        </li>
      </ul>

      <div>
        <h3 className="text-md font-semibold mt-4 mb-1">Forbidden Products:</h3>
        {forbiddenProducts.length > 0 ? (
          <ul className="list-disc ml-5 text-sm text-red-600 space-y-1">
            {forbiddenProducts.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">None for this day</p>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
