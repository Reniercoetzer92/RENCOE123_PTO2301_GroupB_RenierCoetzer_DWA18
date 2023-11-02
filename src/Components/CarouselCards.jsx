import { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types";
import "./Components.css/CarouselCards.css";

/**
 * CarouselCards component displaying a carousel of podcast show images.
 *
 * @param {Object} props - The component's props.
 * @param {string[]} props.idsToShow - An array of show IDs to display.
 * @param {Function} props.onOpenSeason - A callback function to handle opening a season.
 *
 * @returns {JSX.Element} - A React component representing the Cards section.
 */
export default function CarouselCards({ idsToShow, onOpenSeason }) {
  // State for the currently displayed slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to store image URLs
  const [imageUrls, setImageUrls] = useState([]);
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);
  // Reference to the carousel component
  const carouselRef = useRef(null);

  // Fetch and load image URLs for the specified show IDs
  useEffect(() => {
    const imagePromises = idsToShow.map((id) =>
      fetch(`https://podcast-api.netlify.app/id/${id}`)
        .then((response) => response.json())
        .then((data) => data.image)
        .catch(() => null)
    );

    // Set a loading timeout for better user experience
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    Promise.all(imagePromises)
      .then((images) => {
        clearTimeout(loadingTimeout);
        // Filter out null URLs and update state
        setImageUrls(images.filter((url) => url !== null));
        setIsLoading(false);
      })
      .catch((error) => {
        clearTimeout(loadingTimeout);
        console.error(error);
        setIsLoading(false);
      });
  }, [idsToShow]);

  // Automatically switch to the next slide at regular intervals
  useEffect(() => {
    const timer = setInterval(() => {
      if (carouselRef.current && imageUrls.length > 0) {
        const nextSlide = (currentSlide + 1) % imageUrls.length;
        setCurrentSlide(nextSlide);
        carouselRef.current.selected = nextSlide;
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, imageUrls]);

  return (
    <div>
      {isLoading ? (
        <sl-spinner />
      ) : (
        imageUrls.length > 0 && (
          <sl-carousel
            autoplay
            mouse-dragging
            infinite
            navigation
            pagination
            slides-per-page="3"
            slides-per-move="2"
            ref={carouselRef}
          >
            {imageUrls.map((imageUrl, index) => (
              <sl-carousel-item key={index}>
                <img
                  rel="preload"
                  src={imageUrl}
                  alt={`Image for ID ${idsToShow[index]}`}
                  onClick={() => onOpenSeason(idsToShow[index])}
                  className="carousel-card-img"
                  loading="lazy"
                />
              </sl-carousel-item>
            ))}
          </sl-carousel>
        )
      )}
    </div>
  );
}

// Prop type validation for component props
CarouselCards.propTypes = {
  idsToShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenSeason: PropTypes.func.isRequired,
};
