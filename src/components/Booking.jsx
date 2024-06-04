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
    console.log('formObj---->', formObj)
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
      setTotalPrice(nights * props.house.price)
    }
    // eslint-disable-next-line
  }, [startDate, endDate])
  return (
    <div className="border-2 mt-5 p-2">
      <div>
        <span className=" font-bold">${props.house.price} </span>
        <span className=" text-sm text-gray-400 font-bold">/ night</span>
      </div>
      {!booked ? (
        <div>
          <form onSubmit={createBooking}>
            <input
              type="date"
              name="from_date"
              className="border mr-1 mb-2"
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <input
              type="date"
              name="to_date"
              className="border"
              onChange={(e) => {
                setEndDate(new Date(e.target.value))
              }}
            />
            <textarea
              name="message"
              className="border w-96 text-sm p-1"
              placeholder="Please send a message to the host.."
              cols="30"
              rows="10"
            ></textarea>
            <div className=" flex justify-between items-center">
              <div>
                {nights} nights ={' '}
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div>
                <button className="border rounded p-2 text-white bg-[#FB7185]">
                  Reserve
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-green-200 p-4">
          Thanks for your reservation!
        </div>
      )}
    </div>
  )
}

export default Booking
