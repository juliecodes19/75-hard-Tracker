import React from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/register"); // This will navigate to the Register page when the button is clicked
  };

  return (
    <div>
      <h1>Crush it with the 75 Hard Challenge</h1>
      <button onClick={handleGetStartedClick}>Get Started</button>
    </div>
  );
};

export default Home;
