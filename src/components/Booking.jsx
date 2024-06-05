import { useEffect, useState } from 'react'

import axios from 'axios'
axios.defaults.withCredentials = true

function Booking(props) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [booked, setBooked] = useState(false)

  const createBooking = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)

    const formObj = Object.fromEntries(form.entries())

    formObj.house_id = props.house.house_id

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings`,
        formObj
      )
      setBooked(true)
    } catch (e) {
      alert(e.message)
    }
  }

  useEffect(() => {
    if (startDate && endDate) {
      const oneDay = 24 * 60 * 60 * 1000
      const nights = ((startDate - endDate) / oneDay) * -1
      setNights(nights)
      setTotalPrice(nights * props.house.nightly_price)
    }
    // eslint-disable-next-line
  }, [startDate, endDate])
  return (
    <div className="border-2 mt-5 p-2">
      <div>
        <span className=" font-bold">${props.house.nightly_price} </span>
        <span className=" text-sm text-gray-400 font-bold">/ night</span>
      </div>
      {!booked ? (
        <div>
          <form onSubmit={createBooking}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <input
                type="date"
                name="arrival_date"
                className="border mr-1 mb-2"
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
              <input
                type="date"
                name="departure_date"
                className="border"
                onChange={(e) => {
                  setEndDate(new Date(e.target.value))
                }}
              />
            </div>
            <textarea
              name="comment"
              className="border w-full text-sm p-2 rounded mb-4"
              placeholder="Please send a message to the host.."
              cols="30"
              rows="10"
            ></textarea>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-2 sm:mb-0">
                {nights} nights ={' '}
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div>
                <button className="border rounded p-2 text-white bg-[#FB7185] w-full sm:w-auto">
                  Reserve
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-green-200 p-4 rounded">
          Thanks for your reservation!
        </div>
      )}
    </div>
  )
}

export default Booking
