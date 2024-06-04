import NavBar from './Nav'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
axios.defaults.withCredentials = true

function HouseEdit() {
  const params = useParams()

  const [house, setHouse] = useState({
    location: '',
    rooms: '',
    bathrooms: '',
    description: '',
    price: '',
    images: ['', '', '', '', '', '', '', '', '']
  })

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/houses/${params.id}`
        )

        setHouse(response.data)
      } catch (error) {
        console.error('Error fetching house:', error)
      }
    }

    fetchHouse()
  }, [params.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHouse((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const updateHouse = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/houses/${params.id}`,
        house
      )

      if (response.status === 200) {
        window.location.href = `/houses/${params.id}`
      } else {
        console.error('Failed to update house:', response)
      }
    } catch (error) {
      console.error('Error updating house:', error)
    }
  }
  return (
    <div className=" mx-20 mt-2">
      <NavBar />
      <form
        className="border grid grid-cols-2 gap-28 mt-2 p-3"
        onSubmit={updateHouse}
      >
        <div>
          <div className="mb-2">Edit your listing</div>
          <div className="text-sm mt-2 text-gray-400">Location</div>
          <input
            name="location"
            className="border rounded p-1 w-full"
            type="text"
            defaultValue={house.location}
            onChange={handleInputChange}
          />
          <div className="text-sm mt-2 text-gray-400">Bedrooms</div>
          <input
            name="rooms"
            className="border rounded p-1 w-full"
            type="number"
            defaultValue={house.rooms}
            onChange={handleInputChange}
          />
          <div className="text-sm mt-2 text-gray-400">Bathrooms</div>
          <input
            name="bathrooms"
            className="border rounded p-1 w-full"
            type="number"
            defaultValue={house.bathrooms}
            onChange={handleInputChange}
          />
          <div className="text-sm mt-2 text-gray-400">Price per Night</div>
          <input
            name="price"
            className="border rounded p-1 w-full"
            type="number"
            defaultValue={house.price}
            onChange={handleInputChange}
          />
          <div className="text-sm mt-2 text-gray-400">Description</div>
          <textarea
            name="description"
            className="border h-28 p-1 w-full"
            cols="30"
            rows="10"
            defaultValue={house.description}
            onChange={handleInputChange}
          ></textarea>
          <div className=" flex gap-2">
            <button className="border rounded p-2 text-white bg-[#FB7185] hover:shadow">
              Save Changes
            </button>
            <Link to="/listings">
              <button className="border rounded p-2 hover:shadow">
                Cancel
              </button>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col p-2 my-5">
          <span className="text-sm text-gray-400">Photos</span>
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[0]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[1]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[2]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[3]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[4]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[5]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[6]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[7]}
          />
          <input
            name="images"
            type="url"
            placeholder="http://.."
            className="border rounded mb-2 p-1"
            defaultValue={house.images[8]}
          />
        </div>
      </form>
    </div>
  )
}

export default HouseEdit
