import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import your CSS file for specific styling
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { useEffect } from 'react';
import { useAuth } from './header/AuthContext'; // Update the import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser, faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon from react-icons/fa

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert('Please complete all fields.');
      return;
    }
    setLoading(true); // Set loading state to true when registration process starts
    try {
      console.log("User data sent is ", username, password, email);
      await axios.post('http://localhost:8080/api/users/register', { username, password, email });
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setLoading(false); // Set loading state to false after registration process ends
    }
  };

  return (
    <form className="login-form">
      <br />
      <h1 align="center">Register</h1>
      <div className="form-group">
        <FontAwesomeIcon icon={faUser} /> {/* Username icon */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <FontAwesomeIcon icon={faLock} /> {/* Password icon */}
        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye} // Toggle eye icon based on password visibility
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="password-toggle-icon"
          />
        </div>
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
          required
        />
      </div>

      <div className="submit-button-container">
        <button className={`submit-button ${loading ? 'loading' : ''}`} onClick={handleRegister} type="submit" disabled={loading}>
          {loading ? (
            <>
              <FaSpinner className="spinner-icon spin" /> 
              <span>Registering...</span>
            </>
          ) : (
            'Register'
          )}
          {/* Display different text based on loading state */}
        </button>
      </div>
      <br />
      <p>
        Already have an account? <Link to="/login">Click here to Login!</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
