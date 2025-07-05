import { useEffect, useState } from 'react'
import { Table, Badge } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { format } from 'date-fns'

export default function BookingList({ admin, userId }) {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiService.getBookings()
        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }
    fetchBookings()
  }, [])

  const handleStatusChange = async (bookingId, status) => {
    try {
      await apiService.updateBookingStatus(bookingId, status)
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ))
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Facility</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          {admin && <th>Resident</th>}
          {admin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.facilityName}</td>
            <td>{format(new Date(booking.bookingDate), 'dd MMM yyyy')}</td>
            <td>
              {format(new Date(booking.startTime), 'HH:mm')} -{' '}
              {format(new Date(booking.endTime), 'HH:mm')}
            </td>
            <td>
              <Badge
                bg={
                  booking.status === 'APPROVED'
                    ? 'success'
                    : booking.status === 'REJECTED'
                    ? 'danger'
                    : 'warning'
                }
              >
                {booking.status}
              </Badge>
            </td>
            {admin && <td>{booking.residentName}</td>}
            {admin && (
              <td>
                {booking.status === 'PENDING' && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleStatusChange(booking.id, 'APPROVED')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleStatusChange(booking.id, 'REJECTED')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}