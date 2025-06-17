import { useEffect, useState } from "react";
import Background from "./components/Background/Background";
import Loader from "./components/Loader/Loader";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import Header from "./components/Header/Header";
import AppRouter from "./router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/auth/auth-operations";
import { getLoginStatus, getModalStatus } from "./redux/auth/auth-selector";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const AppContent = () => {
  const isLoadingUI = useSelector((state) => state.ui.isLoading);
  const showModal = useSelector(getModalStatus);
  const isLogin = useSelector(getLoginStatus);
  const dispatch = useDispatch();

  const [menuActive, setMenuActive] = useState(false);
  const toggleNavMenu = () => setMenuActive(!menuActive);

  useEffect(() => {
    const body = document.querySelector("#root");
    if (showModal) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [showModal]);


  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Background>
      {isLoadingUI && <Loader />}
      <Header menuActive={menuActive} setMenuActive={setMenuActive} />
      {menuActive && <BurgerMenu toggleNavMenu={toggleNavMenu} />}
      <AppRouter />
    </Background>
  );
};

export default AppContent;
