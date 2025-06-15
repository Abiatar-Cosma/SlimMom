import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "../components/PublicRoute/PublicRoute";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

import { useSelector } from "react-redux";
import { getLoginStatus, getUserDailyDiet } from "../redux/auth/auth-selector";

import Loader from "../components/Loader/Loader";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
// Dacă ai nevoie, deblochează când există pagina:
// const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage/ForgotPasswordPage"));
const CalculatorPage = lazy(() =>
  import("../pages/CalculatorPage/CalculatorPage")
);
const DiaryPage = lazy(() => import("../pages/DiaryPage/DiaryPage"));
const DiaryMobileForm = lazy(() =>
  import("../pages/DiaryMobileForm/DiaryMobileForm")
);
// const DevelopersPage = lazy(() => import("../pages/DevelopersPage/DevelopersPage"));

const AppRouter = () => {
  const isLogin = useSelector(getLoginStatus);
  const isDailyDiet = useSelector(getUserDailyDiet);

  // Redirect fallback logic pentru rute necunoscute
  const fallbackRedirect = !isLogin ? (
    <Navigate to="/" replace />
  ) : isDailyDiet ? (
    <Navigate to="/diary" replace />
  ) : (
    <Navigate to="/calculator" replace />
  );

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Rute publice cu wrapper PublicRoute */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        </Route>

        {/* Rute private cu wrapper PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary-mobile-form" element={<DiaryMobileForm />} />
          {/* <Route path="/developers" element={<DevelopersPage />} /> */}
        </Route>

        {/* Wildcard pentru orice altă rută */}
        <Route path="*" element={fallbackRedirect} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
