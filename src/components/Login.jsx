function Login() {
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
        <form>
          <div className="flex flex-col p-7">
            <div className="text-sm text-gray-400">Email</div>
            <input type="email" className="border rounded h-10" />
            <div className="text-sm text-gray-400 mt-2">Password</div>
            <input type="password" className="border rounded h-10" />
          </div>
        </form>
        <div className="flex justify-center mt-1 p-2">
          <button className="flex justify-center border rounded bg-[#FB7185] text-white px-36 py-3">
            Login
          </button>
        </div>
        <div className="flex justify-start m-5 text-sm">
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
