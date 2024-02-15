import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import your CSS file for specific styling
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { useEffect } from 'react';
import { useAuth } from './header/AuthContext'; // Update the import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser, faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'; // Import necessary icons


  const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8080/api/users/register', {username, password, email});
        alert('User registered successfully');
        navigate('/');
      } catch (error) {
        console.error('Registration failed', error);
      }
    };
    return (
        <form className="login-form">
          <br/>
          <h1 align = "center">Register</h1>
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
          <div className="form-group">
          <FontAwesomeIcon icon={faEnvelope} /> {/* Email icon */}
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="submit-button-container">
          <button className="submit-button" onClick={handleRegister} type="submit">
          Register
          </button>
        </div>
        <br/>
        <p>Already have an account? <Link to="/login">Click here to Login!</Link></p>
        </form>
      );
    };
    
    export default RegisterPage;
  