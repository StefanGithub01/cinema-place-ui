import React, { useState } from 'react';
import axios from 'axios';
//import './ResetPasswordForm.css'; // Import your CSS file for specific styling
import './LoginPage.css'; // Import your CSS file for specific styling
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const UserResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL params
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State variable for loading status

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true before making the request
      // Make the API request to reset password
      await axios.post(`http://localhost:8080/api/users/resetPassword?token=${token}&password=${password}`);
      console.log("Password sent is:", password);
      console.log("Token is", token);
      alert('Password reset successfully');
      navigate('/login');
    } catch (error) {
      alert('Failed to reset password! The token is wrong or expired. Please send another email reset request');
      console.error('Error:', error);
      console.log("Password sent is:", password);
      console.log("Token is", token);


    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <form className="login-form">
      <br/>
      <h1 align="center">Password Reset:</h1>
      <div className="form-group">
            <FontAwesomeIcon icon={faLock} /> {/* Password icon */}
            <label htmlFor="password"> New Password:</label>
            <div className="password-input-container">
                <input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye} // Toggle eye icon based on password visibility
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    className="password-toggle-icon"
                />
            </div>
        </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleResetPassword} type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'} {/* Display 'Loading...' while loading */}
        </button>
      </div>
    </form>
  );
};

export default UserResetPassword;
