import { useEffect, useState } from 'react'
import HouseCard from './HouseCard'
import NavBar from './Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

function Bookings() {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings`
      )
      if (response.data.error) {
        navigate('/')
      } else {
        setBookings(response.data)
      }
    } catch (e) {
      alert(e.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3">
        {bookings.map((booking, index) => (
          <HouseCard key={index} house={booking} isBooking={true} />
        ))}
      </div>
    </div>
  )
}

export default Bookings
