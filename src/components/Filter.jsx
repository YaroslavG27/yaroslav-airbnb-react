import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faBed,
  faDollarSign,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { useEffect, useState } from 'react'

function Filter({ setHouses }) {
  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/locations`
      )
      console.log('response ---->', response)
      setLocations(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formObject = Object.fromEntries(form.entries())
    let queryString = `${process.env.REACT_APP_API_URL}/houses?`
    if (e.target.location.value) {
      queryString = `${process.env.REACT_APP_API_URL}/houses?location=${e.target.location.value}`
      queryString = `${queryString}&`
    }
    if (e.target.min_rooms.value) {
      queryString += `min_rooms=${e.target.min_rooms.value}&`
    }
    if (e.target.max_price.value) {
      queryString += `max_price=${e.target.max_price.value}&`
    }
    if (e.target.sort.value) {
      queryString += `sort=${e.target.sort.value}&`
    }
    if (e.target.search.value) {
      queryString += `search=${e.target.search.value}&`
    }
    if (queryString.endsWith('&')) {
      queryString.replace('&', '')
    }
    try {
      const response = await axios.get(queryString)
      console.log(queryString)
      setHouses(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <form
      onSubmit={submitForm}
      className=" flex bg-[#E5E7EB] p-2 rounded-md gap-2"
    >
      {/* The form should wrap all elements, therefore it 
  should wrap the "grid" too, to avoid breaking it. */}

      {/* Location */}
      <div className="flex w-full bg-white justify-left items-center text-xs rounded-md h-9 p-2">
        <FontAwesomeIcon icon={faHouse} className="p-2" />
        <select name="location" className="w-full">
          <option selected value="" className="text-xs">
            Any Location
          </option>
          {locations.map((location, index) => (
            <option key={index} location={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      {/* Rooms */}
      <div className=" flex w-full bg-white justify-left items-center text-xs rounded-md h-9 p-2">
        <FontAwesomeIcon icon={faBed} className="p-2 " />
        <select name="min_rooms" className="w-full">
          <option selected value="" className="text-xs">
            Any Rooms
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      {/* Max Price */}
      <div className=" bg-white flex w-full justify-left items-center rounded-md h-9">
        <FontAwesomeIcon icon={faDollarSign} className="text-xs p-2" />

        <input
          name="max_price"
          type="number"
          placeholder="max price"
          className="text-sm rounded-sm p-2"
        />
      </div>
      {/* sort by */}
      <div className=" flex w-full bg-white justify-left items-center text-xs rounded-md h-9 p-2">
        <FontAwesomeIcon icon={faSort} className="p-2" />
        <select
          name="sort"
          className=" flex-auto text-xs font-semibold rounded-sm p-2"
        >
          <option selected value="" className="text-xs">
            Sort by
          </option>
          <option>Location</option>
          <option value="price">Price: low to high</option>
          <option value="rooms">Rooms: high to low</option>
        </select>
      </div>
      {/* seach by keywords */}
      <input
        name="search"
        type="text"
        placeholder="keywords.."
        className=" flex w-full bg-white justify-left items-center text-xs rounded-md h-9 p-2"
      />
      <button className="bg-[#FB7185] p-2 text-white flex items-center rounded-md h-9">
        Search
      </button>
      {/* end seach */}
    </form>
  )
}
export default Filter
