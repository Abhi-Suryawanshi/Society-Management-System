import { useState } from 'react'
import AnnouncementForm from '../../components/Announcements/AnnouncementForm'
import AnnouncementList from '../../components/Announcements/AnnouncementList'

export default function Announcements({ admin }) {
  const [refresh, setRefresh] = useState(false)

  const handleAnnouncementCreated = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <h2 className="mb-4">{admin ? 'Manage' : 'Society'} Announcements</h2>
      {admin && <AnnouncementForm onAnnouncementCreated={handleAnnouncementCreated} />}
      <AnnouncementList admin={admin} key={refresh} />
    </>
  )
}