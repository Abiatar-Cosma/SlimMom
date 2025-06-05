import Logo from "../Logo/Logo";
import Navigation from "../NAvigation/Navigation";
import UserInfo from "../UserInfo/UserInfo";
import { useSelector } from "react-redux";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Logo />

      {isLoggedIn && (
        <div className="flex items-center space-x-6">
          <Navigation />
          <UserInfo />
        </div>
      )}
    </header>
  );
};

export default Header;
