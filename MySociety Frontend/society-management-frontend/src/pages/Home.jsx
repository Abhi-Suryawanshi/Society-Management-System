import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to Society Management System</h1>
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Resident Portal</Card.Title>
              <Card.Text>
                Access your resident dashboard to view announcements, book facilities, and more.
              </Card.Text>
              <Link to="/login" className="btn btn-primary">
                Resident Login
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Admin Portal</Card.Title>
              <Card.Text>
                Manage society operations, facilities, and resident accounts.
              </Card.Text>
              <Link to="/login" className="btn btn-primary">
                Admin Login
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}