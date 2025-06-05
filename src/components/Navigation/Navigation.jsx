import { NavLink } from "react-router-dom";

const Navigation = () => {
  const linkClass =
    "text-gray-700 hover:text-green-600 font-medium px-3 py-2 transition";

  const activeClass = "text-orange-500 font-bold";

  return (
    <nav className="flex space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        Calculator
      </NavLink>
      <NavLink
        to="/diary"
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        Diary
      </NavLink>
    </nav>
  );
};

export default Navigation;
