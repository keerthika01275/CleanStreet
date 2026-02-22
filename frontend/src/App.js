import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import FloatingIcons from "./components/FloatingIcons";
import ViewComplaints from "./pages/ViewComplaints";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />

        {/* 👉 ADD THESE TWO */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/view" element={<ViewComplaints/>}/>
      </Routes>
    </BrowserRouter>
  );
}