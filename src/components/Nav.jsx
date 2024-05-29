import { Link } from 'react-router-dom'

function NavBar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (
    <nav className="flex justify-between items-center p-2">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
          alt="Logo"
          className=" w-28"
        />
      </Link>
      {isLoggedIn ? (
        <>
          <div className="flex items-center justify-items h-10 gap-2">
            <Link to="/bookings">
              <div className="flex justify-center items-center border-2 px-2 py-2  rounded-sm text-xs font-semibold hover:shadow">
                My Bookings
              </div>
            </Link>
            <Link to="/listings">
              <div className="flex justify-center items-center border-2 px-2 py-2  rounded-sm text-xs font-semibold hover:shadow">
                My Listings
              </div>
            </Link>
            <div className="flex justify-center items-center border-2 px-2 py-2  rounded-sm text-xs font-semibold hover:shadow">
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="border rounded px-2 py-2 border-rose-300"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  )
}

export default NavBar
