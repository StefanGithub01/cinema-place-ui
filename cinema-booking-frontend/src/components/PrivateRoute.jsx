import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './header/AuthContext'; // Assuming you have a useAuth hook for authentication

const PrivateRoute = () => {
    const { user } = useAuth(); // Assuming you have a user object from your authentication context

    // If user is authenticated, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;