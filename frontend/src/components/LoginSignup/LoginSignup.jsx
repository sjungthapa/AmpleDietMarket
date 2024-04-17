import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [name, setName] = useState(""); // State for name when signing up
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin");
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/home');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleSignup = async () => {
    console.log("handleSignup");
    if (password !== confirmPassword) {
      alert('Passwords do not match!'); // Alert user for password mismatch
      return; // Prevent form submission if passwords don't match
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Registration successful');
        navigate('/home');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {action === "Sign Up" && (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
      </div>
      {action === "Login" ? (
        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
        </div>
      ) : (
        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignup}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
