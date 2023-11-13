import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import apiServiceJWT from "./../services/ApiServiceJWT";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Check the session branch to see how to handle redirects
    // REMOVE-START
    e.preventDefault();
    const { email, password } = state;
    const user = { email, password };

    try {
      const res = await apiServiceJWT.login(user);
      if (res.error) {
        alert(`${res.message}`);
        setState(initialState);
        console.error(res.message);
      } else {
        // Make sure the server response contains the access token
        // and that it is not undefined
        if (res.token) {
          localStorage.setItem("accessToken", res.token);
          login(() => navigate("/dashboard"));
        } else {
          // If the accessToken is missing or undefined, handle the error
          console.error("No access token returned from the server");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors such as showing a message to the user
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
