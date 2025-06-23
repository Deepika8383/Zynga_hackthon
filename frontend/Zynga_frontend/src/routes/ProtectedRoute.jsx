import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isValidUser = localStorage.getItem('isValidUser');
  return isValidUser ? children : <Navigate to="/" />;
}
