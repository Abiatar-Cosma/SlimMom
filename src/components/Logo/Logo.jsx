import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/diary");
  };

  return (
    <button
      onClick={handleClick}
      className="text-2xl font-bold text-green-600 hover:text-green-800 transition"
    >
      Slim<span className="text-orange-500">Mom</span>
    </button>
  );
};

export default Logo;
