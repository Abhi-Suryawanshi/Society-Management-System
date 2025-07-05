import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import authService from '../../services/authService'
import { toast } from 'react-toastify'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authService.login(username, password)
      navigate('/')
      window.location.reload()
    } catch (error) {
      toast.error('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <Card>
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0">Login</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button as="a" href="/register" variant="link" className="ms-2">
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}