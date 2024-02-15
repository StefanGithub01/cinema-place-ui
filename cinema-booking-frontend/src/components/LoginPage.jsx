import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import your CSS file for specific styling
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { useEffect } from 'react';
import { useAuth } from './header/AuthContext'; // Update the import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
  
  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Import and destructure the login function from useAuth
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8080/api/users/register', { username, password });
        alert('User registered successfully');
      } catch (error) {
        console.error('Registration failed', error);
      }
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
        console.log('User logged in successfully');
        console.log('Response data:', response.data);
    
        // Update user information in the context
        login(response.data); // Assuming response.data contains user information
  
    
        // Redirect to the home page after successful login
        alert("Login Succesful!");
        navigate('/');
      } catch (error) {
        alert('Username or Password wrong');
        console.error('Login failed', error);
      }
    };
    
  
    return (
      <form className="login-form">
        <br/>
        <h1 align = "center">Login</h1>
        <div className="form-group">
        <FontAwesomeIcon icon={faUser} /> {/* Username icon */}
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
        <FontAwesomeIcon icon={faLock} /> {/* Password icon */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleLogin} type="submit">
            Login
          </button>
        </div>
        <br/>
        <p>No Account? <Link to="/register">Click here to Register!</Link></p>
      </form>
    );
  };
  
  export default LoginPage;
