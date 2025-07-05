import { useState } from 'react'
import MaintenanceList from '../../components/Maintenance/MaintenanceList'
import { useAuth } from '../../context/AuthContext'

export default function Maintenance({ admin }) {
  const [refresh, setRefresh] = useState(false)
  const { user } = useAuth()

  const handlePayment = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <h2 className="mb-4">{admin ? 'Manage' : 'My'} Maintenance</h2>
      <MaintenanceList 
        admin={admin} 
        userId={user?.id} 
        onPayment={handlePayment} 
        key={refresh}
      />
    </>
  )
}