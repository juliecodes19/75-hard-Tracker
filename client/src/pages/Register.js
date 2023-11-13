import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import apiServiceJWT from "./../services/ApiServiceJWT";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = (props) => {
  let navigate = useNavigate();
  const { register } = useAuth();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Check the client-session to see how to handle redirects
    // REMOVE-START
    e.preventDefault();
    const { email, password, name } = state;
    const user = { name, email, password };

    apiServiceJWT
      .register(state)
      .then((data) => {
        // Handle success, maybe navigate to dashboard or login
        localStorage.setItem("accessToken", data.accessToken);

        register(() => navigate("/dashboard"));
      })
      .catch((error) => {
        // Handle error, set error message to state and display it in the UI
        console.error("Registration failed:", error);
        // For example: setError("Registration failed. Please try again.");
      });
  };

  const validateForm = () => {
    return !state.email || !state.password || !state.name;
  };

  return (
    <div>
      <h2>Welcome to the Challenge That will change your life</h2>
      <p></p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />

        <button className="form-submit" type="submit" disabled={validateForm()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
