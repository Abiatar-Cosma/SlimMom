import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import CalculatorPage from "./pages/CalculatorPage";
import Header from "./components/Header/Header";
import DiaryPage from "./pages/DiaryPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import RegistrationPage from "./pages/RegistrationPAge";
import MainPage from "./pages/MainPage";

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <BrowserRouter>
      {isLoading && <Loader />}

      <Header />

      <Routes>
        {/* <Route path="/" element={<CalculatorPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
