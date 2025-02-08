import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProfileSection from "./components/pages/Profile";
import MyEvent from "./components/pages/MyEvent";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const userId = localStorage.getItem("userId"); // Check if userId exists
  return userId ? element : <Navigate to="/login" replace />;
};

function App() {
  const [myevent, setMyEvent] = useState([]);
  const [eventStatus, setEventStatus] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard setEventStatus={setEventStatus} eventStatus={eventStatus} />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfileSection myevent={myevent} />} />} />
      <Route path="/myevent" element={<ProtectedRoute element={<MyEvent setMyEvent={setMyEvent} setEventStatus={setEventStatus} eventStatus={eventStatus} />} />} />
    </Routes>
  );
}

export default App;
