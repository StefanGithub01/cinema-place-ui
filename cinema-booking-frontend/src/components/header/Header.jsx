// Header.js
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
import { Modal } from 'react-bootstrap';
import PrizeWheel from '../PrizeWheel';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false); // State to toggle submenu

  const handleLogout = () => {
    try {
      logout();
      alert("Logout Succesful!");
      navigate('/');
    } catch {
      alert("Logout ERROR!");
      navigate('/');
    }
  };

  const handleSpinClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSpin = (prizeWon) => {
    // Define the logic to handle the prize won by the user
    console.log("You won:", prizeWon);
    alert("You won: " + prizeWon);
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
                <Nav.Link as={NavLink} to="/actors" className="nav-link">All Actors</Nav.Link>
                <Nav.Link as={NavLink} to="/recommendation" className="nav-link">Recommendations</Nav.Link> {/* Add NavLink for Recommendations */}
                {user.isAdmin && <Nav.Link as={NavLink} to={`/user/admin`} className="nav-link">ADMINISTRATOR</Nav.Link>} {/* Render only if user is admin */}
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
                      {/*<Nav.Link as={NavLink} to={`/user/customisation/${user.userId}`} className="nav-link">My Profile</Nav.Link>*/}
                    </div>
                  )}
                </div>
                <>
                {/*
                  <Nav.Link className="nav-link" onClick={handleSpinClick}>
                    <FontAwesomeIcon icon={faSpinner} spin /> Spin to Win 
                  </Nav.Link>
                  */}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Spin to Win</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <PrizeWheel prizes={['25% discount Movie Ticket', '50% discount Movie Ticket', '75% discount Movie Ticket', '100% discount Movie Ticket', 'Better Luck Next Time :)']} onSpin={handleSpin} />
                    </Modal.Body>
                  </Modal>
                </>

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
