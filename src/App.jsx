import React from "react";
import Background from "./components/Background/Background";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <BrowserRouter>
      <Background>
        {isLoading && <Loader />}
        <Header />
        <AppRouter />
      </Background>
    </BrowserRouter>
  );
};

export default App;
