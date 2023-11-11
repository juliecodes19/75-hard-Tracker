import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import auth from "./utils/auth";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <main className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Home setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </main>
  );
}

export default App;
