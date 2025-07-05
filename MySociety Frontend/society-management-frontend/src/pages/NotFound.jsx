import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Button as={Link} to="/" variant="primary">
        Go to Home
      </Button>
    </Container>
  )
}