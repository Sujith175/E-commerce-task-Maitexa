import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div>
      <form className="auth-form">
        <h1 style={{ color: "rgb(8, 70, 141)" }}>Login</h1>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="submit">Login </button>
          <button type="button">Dont have an Account? Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
