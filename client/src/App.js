import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Provide the auth context */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                {/* Wrap Dashboard with ProtectedRoute */}
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
