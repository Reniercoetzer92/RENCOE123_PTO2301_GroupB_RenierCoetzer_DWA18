import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function Cards({ idsToShow, onOpenSeason }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch the images for each show ID individually
    Promise.all(
      idsToShow.map((id) => {
        return fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then((response) => response.json())
          .then((data) => {
            return data.image;
          })
          .catch((error) => {
            console.error(`Error fetching image for ID ${id}:`, error);
            return null;
          });
      })
    ).then((images) => {
      setImageUrls(images.filter((url) => url !== null));
    });
  }, [idsToShow]);

  useEffect(() => {
    // Start the carousel timer to move to the next slide every 3 seconds
    const timer = setInterval(() => {
      if (carouselRef.current && imageUrls.length > 0) {
        const nextSlide = (currentSlide + 1) % imageUrls.length;
        setCurrentSlide(nextSlide);
        carouselRef.current.select(nextSlide, true); // Move to the next slide
      }
    }, 4000);

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, imageUrls]);

  return (
    <div>
      {/* Slides Carousel */}
      {imageUrls.length > 0 && (
        <sl-carousel
          autoplay
          infinite
          navigation
          pagination
          slides-per-page= "2"
          slides-per-move= "1"
          style={{ maxWidth: "95%" }} // Set a maximum width for the carousel
        >
          {imageUrls.map((imageUrl, index) => (
            <sl-carousel-item key={index}>
              {/* Add an onClick event to the image */}
              <img
                src={imageUrl}
                alt={`Image for ID ${idsToShow[index]}`}
                style={{ width: "60%", height: "100%", objectFit: "cover" }}
                onClick={() => onOpenSeason(idsToShow[index])}
              />
            </sl-carousel-item>
          ))}
        </sl-carousel>
      )}
    </div>
  );
}

Cards.propTypes = {
  idsToShow: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of show IDs
  onOpenSeason: PropTypes.func.isRequired, // Function to handle opening the season
};
