import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

function Signup() {
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const validateEmail = (email) => {
    if (email.includes('@') && email.includes('.')) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }
  // eslint-disable-next-line
  const validatePassword = (password) => {
    if (password.length > 5) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formObject = Object.fromEntries(form.entries())

    const url = `${process.env.REACT_APP_API_URL}/signup`
    try {
      const response = await axios.post(url, formObject)
      if (response.data.error) {
        setError(response.data.error)
      } else {
        localStorage.setItem('isLoggedIn', true)
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center border-2 p-5 rounded-md w-80 mt-8">
          <form onSubmit={submitForm} className="grid">
            {/* Logo */}
            <div className="flex justify-center py-4">
              <img
                src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
                alt="logo"
                className="w-20"
              />
            </div>
            <label className="flex-auto text-xs font-semibold text-gray-600 pr-2">
              First Name
            </label>
            <input
              name="first_name"
              type="text"
              className="border-2 rounded-md p-2 mb-2"
            />
            <label className="text-xs font-semibold text-gray-600 pr-2">
              Last Name
            </label>
            <input
              name="last_name"
              type="text"
              className="border-2 rounded-md p-2 mb-2"
            />
            <label className="block text-xs font-semibold text-gray-600 pr-2">
              Email
              {!validEmail && (
                <span className="text-xs text-red-400 font-light ml-1">
                  Invalid Email
                </span>
              )}
            </label>
            <input
              type="email"
              name="email"
              className={`border-2 rounded-md p-2 mb-2 `}
              onChange={(e) => {
                validateEmail(e.target.value)
              }}
            />
            <label className={`block text-xs font-semibold text-gray-600 pr-2`}>
              Password
              {!validPassword && (
                <span className="text-xs text-red-400 font-light ml-1">
                  Password too short
                </span>
              )}
            </label>
            <input
              name="password"
              type="password"
              className="border-2 rounded-md p-2 mb-2"
              onChange={(e) => {
                validatePassword(e.target.value)
              }}
            />
            <label className="text-xs font-semibold text-gray-600 pr-2">
              Profile Picture
            </label>
            <input
              name="profile_photo"
              type="text"
              placeholder="https://.."
              className="border-2 rounded-md p-2 mb-2"
            />
            <button className="bg-[#FB7185] text-white py-3 rounded-md mb-4">
              Register
            </button>

            {error && (
              <span className=" flex justify-center text-xs text-red-400 font-light mt-0 mb-4">
                {error}
              </span>
            )}
          </form>
          <p className="text-xs font-semibold">
            Already have an account?
            <a href="/login" className="text-[#FB7185] underline pl-2">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
