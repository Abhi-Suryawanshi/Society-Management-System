import axios from 'axios'

const API_URL = '/api'

const getAnnouncements = () => {
  return axios.get(API_URL + '/announcements')
}

const createAnnouncement = (title, content) => {
  return axios.post(API_URL + '/announcements', { title, content })
}

const getFacilities = () => {
  return axios.get(API_URL + '/facilities')
}

const createFacility = (name, description, location, capacity) => {
  return axios.post(API_URL + '/facilities', { name, description, location, capacity })
}

const getBookings = () => {
  return axios.get(API_URL + '/bookings')
}

const createBooking = (facilityId, bookingDate, startTime, endTime) => {
  return axios.post(API_URL + '/bookings', { facilityId, bookingDate, startTime, endTime })
}

const updateBookingStatus = (bookingId, status) => {
  return axios.put(API_URL + `/bookings/${bookingId}/status`, { status })
}

const getComplaints = () => {
  return axios.get(API_URL + '/complaints')
}

const createComplaint = (title, description) => {
  return axios.post(API_URL + '/complaints', { title, description })
}

const updateComplaintStatus = (complaintId, status, resolutionDetails) => {
  return axios.put(API_URL + `/complaints/${complaintId}/status`, { status, resolutionDetails })
}

const getMaintenance = () => {
  return axios.get(API_URL + '/maintenance')
}

const createMaintenance = (flatId, amount, dueDate, description) => {
  return axios.post(API_URL + '/maintenance', { flatId, amount, dueDate, description })
}

const payMaintenance = (maintenanceId) => {
  return axios.put(API_URL + `/maintenance/${maintenanceId}/pay`)
}

export default {
  getAnnouncements,
  createAnnouncement,
  getFacilities,
  createFacility,
  getBookings,
  createBooking,
  updateBookingStatus,
  getComplaints,
  createComplaint,
  updateComplaintStatus,
  getMaintenance,
  createMaintenance,
  payMaintenance
}