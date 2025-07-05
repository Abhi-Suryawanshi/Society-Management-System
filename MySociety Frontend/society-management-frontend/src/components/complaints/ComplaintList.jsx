import { useEffect, useState } from 'react'
import { Table, Badge } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { format } from 'date-fns'

export default function ComplaintList({ admin }) {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await apiService.getComplaints()
        setComplaints(response.data)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      }
    }
    fetchComplaints()
  }, [])

  const handleStatusChange = async (complaintId, status, resolutionDetails) => {
    try {
      await apiService.updateComplaintStatus(complaintId, status, resolutionDetails)
      setComplaints(complaints.map(complaint => 
        complaint.id === complaintId ? { ...complaint, status, resolutionDetails } : complaint
      ))
    } catch (error) {
      console.error('Error updating complaint status:', error)
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created At</th>
          {admin && <th>Resident</th>}
          {admin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint.id}>
            <td>{complaint.title}</td>
            <td>{complaint.description}</td>
            <td>
              <Badge
                bg={
                  complaint.status === 'RESOLVED'
                    ? 'success'
                    : complaint.status === 'CLOSED'
                    ? 'secondary'
                    : 'warning'
                }
              >
                {complaint.status}
              </Badge>
            </td>
            <td>{format(new Date(complaint.createdAt), 'dd MMM yyyy')}</td>
            {admin && <td>{complaint.residentName}</td>}
            {admin && complaint.status === 'OPEN' && (
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    const resolution = prompt('Enter resolution details:')
                    if (resolution) {
                      handleStatusChange(complaint.id, 'RESOLVED', resolution)
                    }
                  }}
                >
                  Resolve
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}