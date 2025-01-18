import React, { useState } from "react";
import NavBar from "./NavBar";
import './NavBar.css';


const Login = ({ setVideo, handleMovieClick }) => {
  // State to store form input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Handle input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log({ username, password, rememberMe });
    
   
  };

  return (
    <>
      <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberChange}
              />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
