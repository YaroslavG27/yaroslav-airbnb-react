import Gallery from './Gallery'
import Reviews from './Reviews'
import NavBar from './Nav'
import Booking from './Booking'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function House() {
  const [house, setHouse] = useState({})

  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()
  const getHouse = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/houses/${id}`
      )
      console.log('data--->', data)
      setHouse(data)
      setIsLoading(false)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getHouse()

    // eslint-disable-next-line
  }, [isLoading, id])

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="m-2">
          <NavBar />
          {[...new Array(house.images)].map((image, index) => (
            <Gallery image={image} key={index} />
          ))}
          <div className=" border-b-2 mb-4 pb-5 grid grid-cols-3 gap-28">
            <div className=" col-span-2">
              <div className="text-xl font-bold mt-5">{house.location}</div>
              <div className="text-sm text-gray-400 mt-5">
                {house.bedrooms} rooms · {house.bathrooms} bathrooms
              </div>
              <div className=" flex gap-2 mt-5">
                <div>
                  <img
                    className="rounded-full w-12 h-12"
                    src={house.host.profile_photo}
                    alt="Host Profile"
                  />
                </div>
                <div className=" block">
                  <div className="text-sm text-gray-400">Hosted by</div>
                  <div>
                    {house.host.firstName} {house.host.lastName}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-5">{house.description}</div>
            </div>
            <Booking house={house} />
            <div>{/* thanks fo booking could be here */}</div>
          </div>
          <div>
            <Reviews rating={house.rating} id={house.house_id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default House
