import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { toast } from 'react-toastify'

export default function ComplaintForm({ onComplaintCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiService.createComplaint(title, description)
      toast.success('Complaint submitted successfully!')
      setTitle('')
      setDescription('')
      onComplaintCreated()
    } catch (error) {
      toast.error('Failed to submit complaint')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>New Complaint</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}