import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav__container">
      <div>
        <Link to="/">TONSHOP</Link>
      </div>
      <div>
        <Link to="/login" className="nav__container--link">
          Login
        </Link>
        <Link to="/signup" className="nav__container--link">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
