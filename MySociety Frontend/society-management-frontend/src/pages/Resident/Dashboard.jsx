import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authService from '../../services/authService'

export default function ResidentDashboard() {
  const user = authService.getCurrentUser()

  return (
    <Container>
      <h2 className="mb-4">Welcome, {user?.fullName}</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-primary h-100">
            <Card.Body>
              <Card.Title>Announcements</Card.Title>
              <Card.Text>View society announcements</Card.Text>
              <Link to="/resident/announcements" className="btn btn-light">
                View Announcements
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-success h-100">
            <Card.Body>
              <Card.Title>Facilities</Card.Title>
              <Card.Text>Book society facilities</Card.Text>
              <Link to="/resident/facilities" className="btn btn-light">
                View Facilities
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-info h-100">
            <Card.Body>
              <Card.Title>Bookings</Card.Title>
              <Card.Text>View your bookings</Card.Text>
              <Link to="/resident/bookings" className="btn btn-light">
                View Bookings
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-warning h-100">
            <Card.Body>
              <Card.Title>Complaints</Card.Title>
              <Card.Text>Raise complaints</Card.Text>
              <Link to="/resident/complaints" className="btn btn-light">
                View Complaints
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-white bg-danger h-100">
            <Card.Body>
              <Card.Title>Maintenance</Card.Title>
              <Card.Text>View maintenance</Card.Text>
              <Link to="/resident/maintenance" className="btn btn-light">
                View Maintenance
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}