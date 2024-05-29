import { useEffect, useState } from 'react'
import HouseCard from './HouseCard'
import NavBar from './Nav'
import axios from 'axios'
axios.defaults.withCredentials = true

function Listings() {
  const [houses, setHouses] = useState([])

  const listOfHouses = houses.map((house, index) => (
    <HouseCard key={index} house={house} isListing={true} id={house.house_id} />
  ))

  const createHouse = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let photos = form.getAll('photos')

    const formObj = Object.fromEntries(form.entries())

    formObj.photos = photos
    console.log('formOnj---> ', formObj)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/houses`,
        formObj
      )
    } catch (e) {
      alert(e.message)
    }
  }
  const getHouses = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/listings`
      )

      setHouses(response.data)
    } catch (e) {
      alert(e.message)
    }
  }
  useEffect(() => {
    getHouses()
  }, [])

  return (
    <div className="container mx-10">
      <div className="flex flex-col">
        <NavBar />
        <div className="border-2 rounded-sm p-4">
          <h1 className="text-sm mb-4">List a House</h1>
          <form onSubmit={createHouse}>
            <div className="grid grid-cols-2 gap-32">
              <div>
                <label className="text-xs text-gray-400 ">Location</label>
                <input
                  name="location"
                  className="w-full border-2 rounded-sm p-2"
                  placeholder="Bali.."
                ></input>
                <label className="text-xs text-gray-400 ">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="w-full border-2 rounded-sm p-2"
                  placeholder="2"
                ></input>
                <label className="text-xs text-gray-400 ">Bathrooms</label>
                <input
                  name="bathrooms"
                  type="number"
                  className="w-full border-2 rounded-sm p-2"
                  placeholder="1"
                ></input>
                <label className="text-xs text-gray-400 ">
                  Price per Night
                </label>
                <input
                  name="nightly_price"
                  type="number"
                  className="w-full border-2 rounded-sm p-2"
                  placeholder="140"
                ></input>
                <label className="text-xs text-gray-400 ">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full border-2 rounded-sm p-2"
                  placeholder="wonderfull appartment with stunning views"
                ></textarea>
                <button className="bg-[#FB7185] text-white p-2 rounded-sm mt-2">
                  List house
                </button>
              </div>
              <div>
                <label className="text-xs text-gray-400">Photos</label>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
                <input
                  name="photos"
                  type="link"
                  className="w-full border-2 rounded-sm p-2 mb-1"
                  placeholder="http://..."
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" grid grid-cols-5 grid-rows-2 gap-3 mt-3">
        {listOfHouses}
      </div>
    </div>
  )
}

export default Listings
