import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import apiService from '../../services/apiService';
import { toast } from 'react-toastify';

export default function FacilityForm({ onFacilityCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    capacity: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.createFacility(
        formData.name,
        formData.description,
        formData.location,
        parseInt(formData.capacity)
      );
      toast.success('Facility created successfully!');
      setFormData({
        name: '',
        description: '',
        location: '',
        capacity: '',
      });
      onFacilityCreated();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create facility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>Add New Facility</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Facility Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
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
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Facility'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}