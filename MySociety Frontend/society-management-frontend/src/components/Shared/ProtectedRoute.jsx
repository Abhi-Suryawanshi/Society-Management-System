import { Navigate, Outlet } from 'react-router-dom'
import authService from '../../services/authService'

export default function ProtectedRoute() {
  const user = authService.getCurrentUser()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}