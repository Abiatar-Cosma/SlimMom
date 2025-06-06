const DiaryProductsList = ({ items, onDelete }) => {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500">No products added yet.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-green-700">
        Today's Products
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b pb-1"
          >
            <div>
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-sm text-gray-600 ml-2">
                {item.weight} g
              </span>
            </div>
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryProductsList;
