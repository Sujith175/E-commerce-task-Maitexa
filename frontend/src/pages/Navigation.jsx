import React from "react";
import "./NavigationStyle.css";
import { Link, Outlet } from "react-router-dom";
const Navigation = () => {
  return (
    <>
      <div className="nav-container">
        <Link className="logo-container">
          <div>
            <h4>Logo</h4>
          </div>
        </Link>
        <div className="nav-link-container">
          <Link to="/shop" className="nav-links">
            Shop
          </Link>
          <Link to="login" className="nav-links">
            Sign IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
