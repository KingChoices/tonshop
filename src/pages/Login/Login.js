import axios from "axios";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLogged, setIsLogged] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.password]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5050/db/users", {
        formData,
      });
      console.log("User logged in successfully:", response);
      setIsLogged(true);
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };
  return (
    <>
      <div>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
