import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import  Accounts  from "../components/accounts/AccountList";
import Login from "../components/login/login";
export const useRoutes = (isAuthenticated) => {
  return (
    <Routes>
      <Route path="/accounts" exact element={<Accounts />} />
      <Route path="/*" element={<Navigate replace to="/accounts" />} />
    </Routes>
  );
};
