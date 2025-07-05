import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { toast } from 'react-toastify'

export default function MaintenanceForm({ onMaintenanceCreated }) {
  const [formData, setFormData] = useState({
    flatId: '',
    amount: '',
    dueDate: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

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
      await apiService.createMaintenance(
        formData.flatId,
        formData.amount,
        formData.dueDate,
        formData.description
      )
      toast.success('Maintenance record created successfully!')
      setFormData({
        flatId: '',
        amount: '',
        dueDate: '',
        description: ''
      })
      onMaintenanceCreated()
    } catch (error) {
      toast.error('Failed to create maintenance record')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>New Maintenance Record</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Flat ID</Form.Label>
            <Form.Control
              type="text"
              name="flatId"
              value={formData.flatId}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Record'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}