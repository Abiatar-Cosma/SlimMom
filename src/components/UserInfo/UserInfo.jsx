import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { selectUserEmail } from "../../redux/authSelectors";

const UserInfo = () => {
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-700">{email}</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
