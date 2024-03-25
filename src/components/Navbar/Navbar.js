import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    }
  }, [token]);

  return (
    <nav className="nav__container">
      {isLogged ? (
        <div className="nav__container--valid">
          <div className="nav__container--home">
            <Link to="/" className="nav__container--logo">
              TONSHOP
            </Link>
          </div>
          <div className="nav__container--links">
            <Link to="/profile" className="nav__container--link">
              Profile
            </Link>
            <Link to="/dashboard" className="nav__container--link">
              Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav__container--unvalid">
          <div className="nav__container--home">
            <Link to="/" className="nav__container--logo">
              TONSHOP
            </Link>
          </div>
          <div className="nav__container--links">
            <Link to="/login" className="nav__container--link">
              Login
            </Link>
            <Link to="/signup" className="nav__container--link">
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
