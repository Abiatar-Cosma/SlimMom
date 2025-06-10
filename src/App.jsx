import React from "react";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
