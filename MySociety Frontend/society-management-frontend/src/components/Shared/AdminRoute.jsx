import { Navigate, Outlet } from 'react-router-dom'
import authService from '../../services/authService'

export default function AdminRoute() {
  const user = authService.getCurrentUser()
  return user?.roles?.includes('ROLE_ADMIN') ? <Outlet /> : <Navigate to="/" />
}