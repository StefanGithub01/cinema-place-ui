import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import '../css/Header.css'; // Import your CSS file

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false); // State to toggle submenu

  const handleLogout = () => {
    try {
      logout();
      alert("Logout Succesful!");
      navigate('/');
    }catch {
      alert("Logout ERROR!");
      navigate('/');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Nav.Link as={NavLink} to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faVideo} /> Cinema Place
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/reviews" className="nav-link">All Reviews</Nav.Link>
                <Nav.Link as={NavLink} to="/actors" className="nav-link">All Actors</Nav.Link>

                <div 
                  className="nav-link greeting" 
                  onMouseEnter={() => setShowSubMenu(true)} // Show submenu on hover
                  onMouseLeave={() => setShowSubMenu(false)} // Hide submenu on mouse leave
                >
                  Hello, {user.username}!
                  {showSubMenu && (
                    <div className="submenu">
                      <Nav.Link as={NavLink} to={`/bookings/${user.userId}`} className="nav-link">My Bookings</Nav.Link>
                      <Nav.Link as={NavLink} to={`/reviews/user/${user.userId}`} className="nav-link">My Reviews</Nav.Link>
                    </div>
                  )}
                </div>
                <Button variant="outline-info" className="logout-button" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav className="login-buttons">
                <Nav.Link as={NavLink} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
