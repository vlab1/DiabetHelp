import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/pages/main/Main.jsx";
import Login from "./components/pages/login/Login.jsx";
import Profile from "./components/pages/profile/Profile.jsx";
import Statistics from "./components/pages/statistics/Statistics.jsx";
import Success from "./components/pages/payment/Success.jsx";
import Canceled from "./components/pages/payment/Canceled.jsx";
export const useRoutes = (isAuthenticated) => {
  return (
    <Routes>
      {isAuthenticated && <Route path="/canceled" exact element={<Canceled />} />}
      {isAuthenticated && <Route path="/success/:key/:time/:days" exact element={<Success />} />}
      <Route path="/main" exact element={<Main />} />
      {isAuthenticated && <Route path="/statistics" exact element={<Statistics />} />}
      {isAuthenticated && <Route path="/profile" exact element={<Profile />} />}
      <Route path="/login" exact element={<Login />} />
      <Route path="/*" element={<Navigate replace to="/main" />} />
    </Routes>
  );
};
