import React from 'react';
import { AuthProvider } from './components/header/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListActorComponent from './components/ListActorComponent';
import ListMovieComponent from './components/ListMovieComponent';
import LoginPage from './components/LoginPage';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import { FooterComponent } from './components/FooterComponent';
import ReviewComponent from './components/ReviewComponent';
import ListReviewComponent from './components/ListReviewComponent';
import RegisterPage from './components/RegisterPage';
import SeatSelectionComponent from './components/SeatSelectionComponent';
import ListBookingsForUserComponent from './components/ListBookingsForUserComponent';
import ListReviewsForUser from './components/ListReviewsForUser';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import ActorMoviesComponent from './components/ActorMoviesComponent';
import AdminPanel from './components/admin/AdminPanel';
import ResetPasswordEmail from './components/ResetPasswordEmail';
import UserResetPassword from './components/UserResetPassword';
import RecommendationComponent from './components/RecommendationComponent';
import SingleMovieDetails from './components/SingleMovieDetails';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resetPassword" element ={<ResetPasswordEmail/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resetPassword/:token" element={<UserResetPassword />} />


            <Route element={<PrivateRoute />}>
              <Route path="/" element={<ListMovieComponent />} />
              <Route path="/actors" element={<ListActorComponent />} />
              <Route path="/recommendation" element={<RecommendationComponent />} />
              <Route path="/movies/actor/:actorId" element={<ActorMoviesComponent />} />
              <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
              <Route path="/add-review/:movieId/:posterImageUrl" element={<ReviewComponent />} />
              <Route path="/reviews/:movieId/:posterImageUrl" element={<ListReviewComponent />} />
              <Route path="/bookings/:userId" element={<ListBookingsForUserComponent />} />
              <Route path="/reviews/user/:userId" element={<ListReviewsForUser />} />
              <Route path="/buy-tickets/:showtimeId/*" element={<SeatSelectionComponent />} />
              <Route path="/movie/:movieId" element={<SingleMovieDetails />} />
              <Route path ="/user/admin" element ={<AdminPanel/>} />
            </Route>
          </Routes>
          <FooterComponent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;