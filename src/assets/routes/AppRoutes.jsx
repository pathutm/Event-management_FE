import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div className="text-center p-10 text-2xl">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
