import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { toast } from 'react-toastify'

export default function AnnouncementForm({ onAnnouncementCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiService.createAnnouncement(title, content)
      toast.success('Announcement created successfully!')
      setTitle('')
      setContent('')
      onAnnouncementCreated()
    } catch (error) {
      toast.error('Failed to create announcement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>Create New Announcement</h4>
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
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Announcement'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}