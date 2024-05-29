import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

function Login() {
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        email,
        password
      }
    )

    if (response.data.error) {
      setError(response.data.error)
    } else {
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
    }
  }

  return (
    <div className="grid grid-cols-3 gap-28">
      <div></div>
      <div className="border-2 mt-10 w-96">
        <div className="flex justify-center mt-5 mb-5">
          <img
            src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
            alt="airbnb"
            width={80}
          />
        </div>
        <form onSubmit={submitForm}>
          <div className="flex flex-col p-7">
            <div className="text-sm text-gray-400">Email</div>
            <input type="email" name="email" className="border rounded h-10" />
            <div className="text-sm text-gray-400 mt-2">Password</div>
            <input
              type="password"
              name="password"
              className="border rounded h-10"
            />
          </div>
          <div className="flex justify-center mt-1 p-2">
            <button className="flex justify-center border rounded bg-[#FB7185] text-white px-36 py-3">
              Login
            </button>
          </div>
        </form>
        <div className="pl-8 text-red-600 text-sm">{error}</div>
        <div className="flex justify-start m-5 ml-6 text-sm">
          <p>
            New to Airbnb?
            <span className=" text-[#FB7185]"> Create an Account</span>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}
export default Login
