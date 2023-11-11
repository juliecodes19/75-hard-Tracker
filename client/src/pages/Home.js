import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
// import { Link } from "react-router-dom";
// import Dashboard from "../components/dashboard/Dashboard";
// import MainLayout from "../layouts/MainLayout";

const Home = (setIsAuthenticated) => {
  return (
    <>
      <section className="home">
        <Routes>
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </section>
    </>
  );
};

export default Home;
