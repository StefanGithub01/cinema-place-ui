// App.js
import React from 'react';
import { AuthProvider } from './components/header/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListActorComponent from './components/ListActorComponent';
import ListMovieComponent from './components/ListMovieComponent';
import LoginPage from './components/LoginPage';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer'; // Import the Trailer component
import Reviews from './components/reviews/Reviews';
import { FooterComponent } from './components/FooterComponent';
import ReviewComponent from './components/ReviewComponent';
import ListReviewComponent from './components/ListReviewComponent';
import RegisterPage from './components/RegisterPage';
import SeatSelectionComponent from './components/SeatSelectionComponent';
import ListBookingsForUserComponent from './components/ListBookingsForUserComponent';
import ListReviewsForUser from './components/ListReviewsForUser';
import ActorMoviesComponent from './components/ActorMoviesComponent';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<ListMovieComponent />} />
            <Route path="/actors" element={<ListActorComponent />} />
            <Route path="/movies/actor/:actorId" element={<ActorMoviesComponent/>} />
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
            <Route path="/reviews/:movieId" element={<Reviews />} />
            <Route path="/add-review/:movieId/:posterImageUrl" element={<ReviewComponent />} />
            <Route path="/reviews" element={<ListReviewComponent />} />
            <Route path="/bookings/:userId" element={<ListBookingsForUserComponent />} />
            <Route path="/reviews/user/:userId" element={<ListReviewsForUser/>} />
            <Route path="/buy-tickets/:showtimeId/*" element={<SeatSelectionComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
