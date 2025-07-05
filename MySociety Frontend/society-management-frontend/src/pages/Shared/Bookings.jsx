import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import BookingForm from '../../components/Bookings/BookingForm'
import BookingList from '../../components/Bookings/BookingList'

export default function Bookings({ admin }) {
  const [refresh, setRefresh] = useState(false)
  const { user } = useAuth()

  const handleBookingCreated = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <h2 className="mb-4">{admin ? 'Manage' : 'My'} Bookings</h2>
      {!admin && <BookingForm onBookingCreated={handleBookingCreated} />}
      <BookingList admin={admin} userId={user?.id} key={refresh} />
    </>
  )
}