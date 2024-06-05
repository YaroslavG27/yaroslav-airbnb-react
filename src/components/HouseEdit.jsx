import NavBar from './Nav'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true

function HouseEdit() {
  const params = useParams()
  const navigate = useNavigate()

  const [house, setHouse] = useState({
    images: []
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

  //update the data with patch
  const updateHouse = async (e) => {
    //1. prevent browser from reload
    try {
      e.preventDefault()
      //2 get data from form from e.target
      const form = new FormData(e.target)
      const formObj = Object.fromEntries(form.entries())
      //retrieves all 'images' field in an array of strings
      formObj.images = form.getAll('images')
      formObj.house_id = params

      let response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/houses/${params.id}`,
        formObj
      )
      setHouse(response.data)
      navigate(`/houses/${params.id}`)
    } catch (e) {
      alert(e.message)
    }
  }
  return (
    <div className="mx-4 sm:mx-10 md:mx-20 mt-2">
      <NavBar />
      <form
        className="border grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-28 mt-2 p-3"
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
            name="bedrooms"
            className="border rounded p-1 w-full"
            type="number"
            defaultValue={house.bedrooms}
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
            name="nightly_price"
            className="border rounded p-1 w-full"
            type="number"
            defaultValue={house.nightly_price}
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
        <div className=" flex gap-2">
          <button className="border rounded p-2 text-white bg-[#FB7185] hover:shadow">
            Save Changes
          </button>
          <Link to="/listings">
            <button className="border rounded p-2 hover:shadow">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default HouseEdit
