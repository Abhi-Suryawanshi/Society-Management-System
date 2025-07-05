import { useEffect, useState } from 'react'
import { Table, Badge } from 'react-bootstrap'
import apiService from '../../services/apiService'

export default function FacilityList({ admin }) {
  const [facilities, setFacilities] = useState([])

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiService.getFacilities()
        setFacilities(response.data)
      } catch (error) {
        console.error('Error fetching facilities:', error)
      }
    }
    fetchFacilities()
  }, [])

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Capacity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {facilities.map((facility) => (
          <tr key={facility.id}>
            <td>{facility.name}</td>
            <td>{facility.description}</td>
            <td>{facility.location}</td>
            <td>{facility.capacity}</td>
            <td>
              <Badge bg={facility.available ? 'success' : 'danger'}>
                {facility.available ? 'Available' : 'Unavailable'}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}