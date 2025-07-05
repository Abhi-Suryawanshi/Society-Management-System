import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { format } from 'date-fns'

export default function AnnouncementList({ admin }) {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await apiService.getAnnouncements()
        setAnnouncements(response.data)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      }
    }
    fetchAnnouncements()
  }, [])

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Published On</th>
          {admin && <th>Published By</th>}
        </tr>
      </thead>
      <tbody>
        {announcements.map((announcement) => (
          <tr key={announcement.id}>
            <td>{announcement.title}</td>
            <td>{announcement.content}</td>
            <td>{format(new Date(announcement.createdAt), 'dd MMM yyyy HH:mm')}</td>
            {admin && <td>{announcement.createdBy}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}