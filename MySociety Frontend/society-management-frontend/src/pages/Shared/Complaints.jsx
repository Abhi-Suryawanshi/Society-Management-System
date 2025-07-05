import { useState } from 'react'
import ComplaintForm from '../../components/Complaints/ComplaintForm'
import ComplaintList from '../../components/Complaints/ComplaintList'

export default function Complaints({ admin }) {
  const [refresh, setRefresh] = useState(false)

  const handleComplaintCreated = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <h2 className="mb-4">{admin ? 'Manage' : 'My'} Complaints</h2>
      {!admin && <ComplaintForm onComplaintCreated={handleComplaintCreated} />}
      <ComplaintList admin={admin} key={refresh} />
    </>
  )
}