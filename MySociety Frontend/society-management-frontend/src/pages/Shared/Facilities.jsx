import { useState } from 'react'
import FacilityForm from '../../components/Facilities/FacilityForm'
import FacilityList from '../../components/Facilities/FacilityList'

export default function Facilities({ admin }) {
  const [refresh, setRefresh] = useState(false)

  const handleFacilityCreated = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <h2 className="mb-4">{admin ? 'Manage' : 'Society'} Facilities</h2>
      {admin && <FacilityForm onFacilityCreated={handleFacilityCreated} />}
      <FacilityList admin={admin} key={refresh} />
    </>
  )
}