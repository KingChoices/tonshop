import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      console.log("Form data:", formData);
      const response = await axios.post(
        "http://localhost:5050/db/login",
        formData
      );
      console.log("User logged in successfully:", response);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log("Logged in:", response.data.token);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
