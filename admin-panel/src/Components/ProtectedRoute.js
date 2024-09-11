import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Sprawdzamy, czy istnieje token
  if (!token) {
    return <Navigate to="/login" />; // Jeśli brak tokenu, przekierowanie na login
  }

  // Jeśli token istnieje, renderujemy dzieci (czyli chronione komponenty)
  return children;
}

export default ProtectedRoute;
