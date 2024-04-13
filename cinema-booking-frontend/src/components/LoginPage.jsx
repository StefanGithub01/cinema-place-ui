import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './header/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Load saved credentials from cookies on component mount
  useEffect(() => {
    const savedUsername = getCookie('username');
    const savedPassword = getCookie('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
      console.log('User logged in successfully');
      console.log('Response data:', response.data);

      // Save credentials to cookies
      setCookie('username', username, 7); // Set cookie for 7 days
      setCookie('password', password, 7);

      login(response.data);
      alert("Login Successful!");
      navigate('/');
    } catch (error) {
      alert('Username or Password wrong');
      console.error('Login failed', error);
    }
  };

  // Function to set cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  // Function to get cookie
  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  return (
    <form className="login-form">
      <br />
      <h1 align="center">Login</h1>
      <div className="form-group">
        <FontAwesomeIcon icon={faUser} />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <FontAwesomeIcon icon={faLock} />
        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-icon"
          />
        </div>
        <p> <Link to="/resetPassword"> Forgot Password?</Link></p>
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleLogin} type="submit">
          Login
        </button>
      </div>
      <br />
      <p>No Account? <Link to="/register">Click here to Register!</Link></p>
    </form>
  );
};

export default LoginPage;
