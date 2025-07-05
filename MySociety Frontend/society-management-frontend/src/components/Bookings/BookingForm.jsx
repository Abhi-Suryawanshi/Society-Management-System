import { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { toast } from 'react-toastify'

export default function BookingForm({ onBookingCreated }) {
  const [facilities, setFacilities] = useState([])
  const [formData, setFormData] = useState({
    facilityId: '',
    bookingDate: '',
    startTime: '',
    endTime: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiService.getFacilities()
        setFacilities(response.data)
      } catch (error) {
        console.error('Error fetching facilities:', error)
      }
    }
    fetchFacilities()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiService.createBooking(
        formData.facilityId,
        formData.bookingDate,
        formData.startTime,
        formData.endTime
      )
      toast.success('Booking created successfully!')
      setFormData({
        facilityId: '',
        bookingDate: '',
        startTime: '',
        endTime: ''
      })
      onBookingCreated()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>New Booking</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Facility</Form.Label>
            <Form.Select
              name="facilityId"
              value={formData.facilityId}
              onChange={handleChange}
              required
            >
              <option value="">Select Facility</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Booking...' : 'Book Facility'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}