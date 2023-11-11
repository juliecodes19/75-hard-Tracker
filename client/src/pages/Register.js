import React, { useState } from "react";
import auth from "../utils/auth";
import apiServiceJWT from "./../services/ApiServiceJWT";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};

const Register = (props) => {
  let navigate = useNavigate();
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
    const { email, password, fullName } = state;
    const user = { fullName, email, password };
    const res = await apiServiceJWT.register(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      props.setIsAuthenticated(true);
      auth.login(() => navigate("/profile"));
    }
    // REMOVE-END
  };

  const validateForm = () => {
    return !state.email || !state.password || !state.fullName;
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="fullName"
          value={state.fullName}
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
