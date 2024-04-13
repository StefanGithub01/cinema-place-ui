import React, { useState } from 'react';
import axios from 'axios';
//import './ResetPasswordForm.css'; // Import your CSS file for specific styling
import './LoginPage.css'; // Import your CSS file for specific styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const ResetPasswordEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State variable for loading status

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true before making the request
      // Make the API request to initiate password reset
      await axios.post('http://localhost:8080/api/users/forgotPassword', null, {
        params: {
          email: email
        }
      });
      console.log("Email sent is:", email);
      alert('Password reset email sent successfully');
      navigate('/login'); // Redirect to the login page after successful reset
    } catch (error) {
      alert('Failed to initiate password reset');
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <form className="login-form">
      <br/>
      <h1 align="center">Reset Password:</h1>
      <div className="form-group">
        <FontAwesomeIcon icon={faEnvelope} /> {/* Email icon */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter the Email you used for registration."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleResetPassword} type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'} {/* Display 'Loading...' while loading */}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordEmail;
