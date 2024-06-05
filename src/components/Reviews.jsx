import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

function Reviews(props) {
  const [reviews, setReviews] = useState([])

  const createReview = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())

    formObject.id = props.id
    console.log('form--->', formObject)
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reviews`,
      formObject
    )
    console.log('respond--->', response)
    setReviews([...reviews, response.data])
  }

  const getReviews = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/reviews?house_id=${props.id}`
      const response = await axios.get(url)

      setReviews(response.data)
      console.log('props------->', props)
      console.log('review---->', response.data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getReviews()
    // eslint-disable-next-line
  }, [])

  let totReviews = reviews.length
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-1 mb-4">
            <FontAwesomeIcon icon={faCommentDots} className="text-gray-400" />
            <h3 className="text-lg font-bold">{totReviews} Reviews</h3>
          </div>
          <div className=" flex items-center gap-1 mb-8">
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <p className="text-xs">{props.rating}</p>
          </div>
          {reviews.map((review, index) => (
            <Review key={index} user={review} />
          ))}
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-sm font-bold mb-2">Leave a review</p>
          <div className="flex gap-1 items-center mb-4">
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-[#FBBF24] text-xs" />
            <p className="text-xs">0</p>
          </div>
          <div className=" my-2">
            <form onSubmit={createReview}>
              <div className="py-2 text-sm flex justify-start mb-4">
                <input type="radio" name="rating" value="1" className="mr-1" />
                <input type="radio" name="rating" value="2" className="mr-1" />
                <input type="radio" name="rating" value="3" className="mr-1" />
                <input type="radio" name="rating" value="4" className="mr-1" />
                <input type="radio" name="rating" value="5" className="mr-1" />
              </div>
              <div className=" text-sm justify-start mt-3">
                <textarea
                  name="review_text"
                  className="border w-full text-sm p-2 rounded mb-4"
                  placeholder="Please leave a review for this house..."
                  cols="30"
                  rows="4"
                ></textarea>
              </div>
              <div className=" text-sm text-white mt-1">
                <button className="border bg-rose-400 p-2 rounded-md text-white w-full">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function Review(props) {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="flex gap-2 items-center mb-2">
        <img
          src={props.user.author.profile_photo}
          alt="profile pic"
          className="rounded-full w-8 h-8"
        />
        <div className=" flex-col ">
          <>
            <p className="text-xs text-gray-400">22 Jan 2024</p>
          </>
          <>
            <h6 className="text-xs">
              {props.user.author.firstName} {props.user.author.lastName}
            </h6>
          </>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-2">
        {[...new Array(props.user.rating)].map((i, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className="text-[#FBBF24] text-xs"
          />
        ))}
        <p className="text-xs">{props.user.rating}</p>
      </div>
      <div className="pt-2">
        <p className="text-xs leading-1 ">{props.user.content}</p>
      </div>
    </div>
  )
}

export default Reviews
