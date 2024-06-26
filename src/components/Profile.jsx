import { useNavigate } from 'react-router-dom'
import NavBar from './Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

function Profile() {
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('')
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`
      )
      if (response.data.error) {
        navigate('/')
      } else {
        setUser(response.data)
        setPicture(response.data.picture)
      }
    } catch (e) {
      alert(e.message)
    }
  }

  const modifyUser = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formObj = Object.fromEntries(form.entries())

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/profile`,
        formObj
      )
      alert('changes done')
    } catch (e) {
      alert(e.message)
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`
      )

      localStorage.removeItem('isLoggedIn')
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-32">
      <NavBar />
      <div className=" border-2 p-6">
        <div className="py-4">
          <h2 className="font-bold text-lg">Your Profile</h2>
        </div>
        <form onSubmit={modifyUser}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0">
              {
                <img
                  src={user.profile_photo}
                  alt="Profile pic"
                  className="rounded-full w-14 mr-4"
                />
              }
            </div>
            <div className="flex-auto border-2 rounded-sm my-4 w-full md:w-auto">
              <input
                type="text"
                name="profile_photo"
                onChange={(e) => setPicture(e.target.value)}
                defaultValue={user.profile_photo}
                className="p-2 w-full"
                placeholder="https://..."
              />
            </div>
          </div>

          <label className="text-sm font-semibold text-gray-500 mt-4">
            First Name
          </label>
          <div className="flex-auto border-2 rounded-sm mb-4">
            <input
              className="p-2 w-full"
              defaultValue={user.first_name}
              name="first_name"
            />
          </div>
          {/* Last Name*/}
          <label className="text-sm font-semibold text-gray-500">
            Last Name
          </label>
          <div className="flex-auto border-2 rounded-sm mb-4">
            <input
              className="p-2 w-full"
              defaultValue={user.last_name}
              name="last_name"
            />
          </div>
          {/* Email Name*/}
          <label className="text-sm font-semibold text-gray-500">Email</label>
          <div className="flex-auto border-2 rounded-sm mb-4">
            <input
              className="p-2 w-full"
              defaultValue={user.email}
              name="email"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <button className="bg-[#FB7185] px-8 py-2 text-white rounded-sm mb-4 md:mb-0">
              Save Changes
            </button>
            <button onClick={logout} className="border-2 px-8 py-2">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
