const RightSidebar = () => {
  const data = {
    recommended: 1500,
    consumed: 750,
    forbiddenProducts: ["Bread", "Sugar", "Pasta", "Chocolate"],
  };

  const remaining = data.recommended - data.consumed;

  return (
    <aside className="bg-white p-4 rounded shadow w-full max-w-xs space-y-4">
      <h2 className="text-lg font-bold text-green-700">Summary for Today</h2>

      <ul className="space-y-2 text-sm">
        <li>
          <strong>Recommended: </strong>
          {data.recommended} kcal
        </li>
        <li>
          <strong>Consumed: </strong>
          {data.consumed} kcal
        </li>
        <li>
          <strong>Remaining: </strong>
          {remaining > 0 ? remaining : 0} kcal
        </li>
      </ul>

      <div>
        <h3 className="text-md font-semibold mt-4 mb-1">Forbidden Products:</h3>
        <ul className="list-disc ml-5 text-sm text-red-600 space-y-1">
          {data.forbiddenProducts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
