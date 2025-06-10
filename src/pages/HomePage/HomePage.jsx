import React from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/ui/uiSlice";

const MainPage = () => {
  const dispatch = useDispatch();

  const simulateLoading = () => {
    dispatch(showLoader());
    setTimeout(() => {
      dispatch(hideLoader());
    }, 2000); // ascunde loaderul după 2 secunde
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Main Page</h1>
      <button onClick={simulateLoading}>Simulează Loader</button>
    </div>
  );
};

export default MainPage;
