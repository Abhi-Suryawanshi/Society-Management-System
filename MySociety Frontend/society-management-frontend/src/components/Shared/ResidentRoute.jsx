import { Navigate, Outlet } from 'react-router-dom'
import authService from '../../services/authService'

export default function ResidentRoute() {
  const user = authService.getCurrentUser()
  return user?.roles?.includes('ROLE_RESIDENT') ? <Outlet /> : <Navigate to="/" />
}