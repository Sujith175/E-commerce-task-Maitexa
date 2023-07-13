import React from "react";
import "../Login/Login.css";
const Signup = () => {
  return (
    <div>
      <form className="auth-form">
        <h1 style={{ color: "rgb(8, 70, 141)" }}>SignUp</h1>
        <div className="form-control">
          <label htmlFor="email">First Name</label>
          <input type="text" id="firstName" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Last Name</label>
          <input type="text" id="lastName" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Mobile</label>
          <input type="number" id="mobile" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="submit">Login </button>
          <button type="button">Already Have an Account? Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
