import { useEffect, useState } from "react";
import Background from "./components/Background/Background";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import AppRouter from "./router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/auth/auth-operations";
import {
  getAccessToken,
  getLoginStatus,
  getModalStatus,
} from "./redux/auth/auth-selector";
import { useSearchParams } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "./redux/auth/auth-slice";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const AppContent = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const showModal = useSelector(getModalStatus);
  const isLogin = useSelector(getLoginStatus);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();

  const [menuActive, setMenuActive] = useState(false);
  const toggleNavMenu = () => setMenuActive(!menuActive);

  const [searchParams] = useSearchParams();
  const accessTokenFromURL = searchParams.get("accessToken");
  const refreshTokenFromURL = searchParams.get("refreshToken");

  useEffect(() => {
    const body = document.querySelector("#root");
    if (showModal) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [showModal]);

  useEffect(() => {
    if (accessTokenFromURL && refreshTokenFromURL) {
      dispatch(setAccessToken(accessTokenFromURL));
      dispatch(setRefreshToken(refreshTokenFromURL));
    }
  }, [accessTokenFromURL, refreshTokenFromURL, dispatch]);

  useEffect(() => {
    if (!isLogin && accessToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLogin, accessToken]);

  return (
    <Background>
      {isLoading && <Loader />}
      <Header />
      <AppRouter />
    </Background>
  );
};

export default AppContent;
