import { useState } from 'react'

function Gallery(props) {
  const [selectedImage, setSelectedImage] = useState(props.image[0])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="rounded">
        <div className=" aspect-video">
          <img
            className="rounded-md w-full h-full object-cover"
            src={selectedImage}
            alt="house"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
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
