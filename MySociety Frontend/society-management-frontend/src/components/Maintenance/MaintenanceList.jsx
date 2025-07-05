import { useEffect, useState } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import apiService from '../../services/apiService'
import { format } from 'date-fns'

export default function MaintenanceList({ admin, userId, onPayment }) {
  const [maintenanceRecords, setMaintenanceRecords] = useState([])

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = admin 
          ? await apiService.getMaintenance() 
          : await apiService.getUserMaintenance(userId)
        setMaintenanceRecords(response.data)
      } catch (error) {
        console.error('Error fetching maintenance records:', error)
      }
    }
    fetchMaintenance()
  }, [admin, userId])

  const handlePay = async (maintenanceId) => {
    try {
      await apiService.payMaintenance(maintenanceId)
      onPayment()
    } catch (error) {
      console.error('Error processing payment:', error)
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Flat</th>
          <th>Block</th>
          <th>Amount</th>
          <th>Due Date</th>
          <th>Status</th>
          {!admin && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {maintenanceRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.flatNumber}</td>
            <td>{record.blockName}</td>
            <td>{record.amount}</td>
            <td>{format(new Date(record.dueDate), 'dd MMM yyyy')}</td>
            <td>
              <Badge
                bg={
                  record.status === 'PAID'
                    ? 'success'
                    : record.status === 'OVERDUE'
                    ? 'danger'
                    : 'warning'
                }
              >
                {record.status}
              </Badge>
            </td>
            {!admin && record.status === 'PENDING' && (
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handlePay(record.id)}
                >
                  Pay Now
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}