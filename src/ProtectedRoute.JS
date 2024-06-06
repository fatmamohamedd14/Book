import { Route, Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    // Check user authentication
    const token = localStorage.getItem('token');

    if (token) {
        // If authenticated, render the children
        return <Route>{children}</Route>;
    } else {
        // If not authenticated, redirect to the login page
        return <Navigate to='/LogIn' />;
    }
}
