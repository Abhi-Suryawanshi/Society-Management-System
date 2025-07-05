import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-primary h-100">
            <Card.Body>
              <Card.Title>Announcements</Card.Title>
              <Card.Text>Manage society announcements</Card.Text>
              <Link to="/admin/announcements" className="btn btn-light">
                Go to Announcements
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-success h-100">
            <Card.Body>
              <Card.Title>Facilities</Card.Title>
              <Card.Text>Manage society facilities</Card.Text>
              <Link to="/admin/facilities" className="btn btn-light">
                Go to Facilities
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-info h-100">
            <Card.Body>
              <Card.Title>Bookings</Card.Title>
              <Card.Text>Manage facility bookings</Card.Text>
              <Link to="/admin/bookings" className="btn btn-light">
                Go to Bookings
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-warning h-100">
            <Card.Body>
              <Card.Title>Complaints</Card.Title>
              <Card.Text>Manage resident complaints</Card.Text>
              <Link to="/admin/complaints" className="btn btn-light">
                Go to Complaints
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-danger h-100">
            <Card.Body>
              <Card.Title>Maintenance</Card.Title>
              <Card.Text>Manage maintenance records</Card.Text>
              <Link to="/admin/maintenance" className="btn btn-light">
                Go to Maintenance
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-secondary h-100">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>Manage resident accounts</Card.Text>
              <Link to="/admin/users" className="btn btn-light">
                Go to Users
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}