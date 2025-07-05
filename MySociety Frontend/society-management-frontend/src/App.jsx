import { Routes, Route } from 'react-router-dom'
import Layout from './components/Shared/Layout'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import AdminDashboard from './pages/Admin/Dashboard'
import ResidentDashboard from './pages/Resident/Dashboard'
import Announcements from './pages/Shared/Announcements'
import Facilities from './pages/Shared/Facilities'
import Bookings from './pages/Shared/Bookings'
import Complaints from './pages/Shared/Complaints'
import Maintenance from './pages/Shared/Maintenance'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/Shared/ProtectedRoute'
import AdminRoute from './components/Shared/AdminRoute'
import ResidentRoute from './components/Shared/ResidentRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route path="admin" element={<ProtectedRoute><AdminRoute /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="announcements" element={<Announcements admin />} />
          <Route path="facilities" element={<Facilities admin />} />
          <Route path="bookings" element={<Bookings admin />} />
          <Route path="complaints" element={<Complaints admin />} />
          <Route path="maintenance" element={<Maintenance admin />} />
        </Route>
        
        <Route path="resident" element={<ProtectedRoute><ResidentRoute /></ProtectedRoute>}>
          <Route index element={<ResidentDashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}