import React, { useState,useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProfileSection from "./components/pages/Profile";
import MyEvent from "./components/pages/MyEvent";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_API + "/api/emptyReq";
// const SERVER_URL = "http://localhost:3000/api/emptyReq";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const userId = localStorage.getItem("userId"); // Check if userId exists
  return userId ? element : <Navigate to="/login" replace />;
};

function App() {
  const hitRender = async () => {
    try {
      await axios.get(SERVER_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Render is booting up,Wait a bit");
    }
  };

  useEffect(() => {
    hitRender();
  }, []);
  const [myevent, setMyEvent] = useState([]);
  const [eventStatus, setEventStatus] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={
              <Dashboard
                setEventStatus={setEventStatus}
                eventStatus={eventStatus}
              />
            }
          />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute element={<ProfileSection myevent={myevent} />} />
        }
      />
      <Route
        path="/myevent"
        element={
          <ProtectedRoute
            element={
              <MyEvent
                setMyEvent={setMyEvent}
                setEventStatus={setEventStatus}
                eventStatus={eventStatus}
              />
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
