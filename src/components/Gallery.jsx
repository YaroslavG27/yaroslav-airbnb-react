import { useState } from 'react'

function Gallery(props) {
  const [selectedImage, setSelectedImage] = useState(props.image[0])

  return (
    <div className=" grid grid-cols-2 gap-8">
      <div className="rounded">
        <div className=" aspect-video">
          <img
            className="rounded-md w-full h-full object-cover"
            src={selectedImage}
            alt="house"
          />
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-2">
        {props.image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="house"
            onClick={(event) => {
              setSelectedImage(event.target.src)
            }}
            className="rounded-md w-full object-cover aspect-video"
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
