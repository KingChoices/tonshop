// Signup.js
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    console.log("Form data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5050/db/register",
        formData
      );
      console.log("User signed up successfully:" + response);
    } catch (error) {
      console.error("Error signing up:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
