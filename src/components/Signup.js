import React, { useState } from 'react';
import NavBar from "./NavBar";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);

    // Log values before validation
    console.log("Values before validation:", values);

    if (err.name === "" && err.email === "" && err.password === "") {
      // Log values before sending to the backend
      console.log("Values being sent to server:", values);

      axios.post('/signup', values) // Relative URL with proxy
        .then(res => {
          console.log("Server response:", res.data); // Log server response
          navigate('/');
        })
        .catch(err => console.log("Error during signup:", err));
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <div className="input-box">
            <label htmlFor='name'><strong>Name</strong></label>
            <input 
              type="text" 
              placeholder="Enter Name" 
              name='name'
              onChange={handleInput}  
              required 
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div className="input-box">
            <label htmlFor='email'><strong>Email</strong></label>
            <input 
              type="email" 
              placeholder="Enter email" 
              name='email'
              onChange={handleInput} 
              required 
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="input-box">
            <label htmlFor='password'><strong>Password</strong></label>
            <input 
              type="password" 
              placeholder="Password" 
              name='password'
              onChange={handleInput} 
              required 
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">Sign Up</button>
          <div className="register-link">
            <p>
              You have an account?   
              <Link to="/Login" className=""> Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
