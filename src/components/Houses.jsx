import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './Filter'
import HouseCard from './HouseCard'
import NavBar from './Nav'

function Houses() {
  const [houses, setHouses] = useState([])

  const getHouses = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/houses`
      const response = await axios.get(url)
      setHouses(response.data)
      console.log('respuesta data', response.data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getHouses()
  }, [])

  const listOfHouses = houses.map((house, index) => (
    <HouseCard key={index} house={house} id={house.house_id} />
  ))

  return (
    <div className="container mx-auto">
      <NavBar />
      <Filter setHouses={setHouses} />
      <div className=" grid grid-cols-5 grid-rows-2 gap-3 mt-3">
        {listOfHouses}
      </div>
    </div>
  )
}

export default Houses
