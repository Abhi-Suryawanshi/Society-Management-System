import { Link, Outlet } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'
import authService from '../../services/authService'

export default function Layout() {
  const user = authService.getCurrentUser()

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Society Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && (
                <Nav.Link as={Link} to={user.roles.includes('ROLE_ADMIN') ? '/admin' : '/resident'}>
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>

      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="text-center p-3 bg-primary text-white">
          © 2023 Society Management System
        </div>
      </footer>
    </>
  )
}