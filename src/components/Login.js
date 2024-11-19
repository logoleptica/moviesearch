import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValid";
import axios from "axios";

const Login = ({ setVideo, handleMovieClick }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = validation(values);
    setErrors(err);

    // Proceed only if no frontend validation errors
    if (err.email === "" && err.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          console.log("Backend Response: ", res.data);

          // Handle response from backend
          if (res.data.message === "Login successful!") {
            setBackendError("");
            navigate("/home");
          } else {
            setBackendError("No matching record found.");
          }
        })
        .catch((err) => {
          console.error(err);
          setBackendError("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <>
      <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
      <div className="login-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              required
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="input-box">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              required
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          {backendError && <p className="error-message">{backendError}</p>}
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
