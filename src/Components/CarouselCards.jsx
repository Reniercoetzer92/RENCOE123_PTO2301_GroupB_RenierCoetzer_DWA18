import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import "./Components.css/CarouselCards.css";
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = React.useRef(null);

  useEffect(() => {
    const imagePromises = idsToShow.map((id) =>
      fetch(`https://podcast-api.netlify.app/id/${id}`)
        .then((response) => response.json())
        .then((data) => data.image)
        .catch(() => null)
    );

    // Set a minimum loading time for the spinner
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    Promise.all(imagePromises)
      .then((images) => {
        clearTimeout(loadingTimeout); // Cancel the loading timeout
        setImageUrls(images.filter((url) => url !== null));
        setIsLoading(false);
      })
      .catch((error) => {
        clearTimeout(loadingTimeout); // Cancel the loading timeout
        console.error(error);
        setIsLoading(false);
      });
  }, [idsToShow]);

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
        <sl-spinner/>
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
            style={{ maxWidth: "100%" }}
            ref={carouselRef}
          >
            {imageUrls.map((imageUrl, index) => (
              <sl-carousel-item key={index}>
                <img
                  src={imageUrl}
                  alt={`Image for ID ${idsToShow[index]}`}
                  onClick={() => onOpenSeason(idsToShow[index])}
                  className="carousel-card-img"
                />
              </sl-carousel-item>
            ))}
          </sl-carousel>
        )
      )}
    </div>
  );
}

CarouselCards.propTypes = {
  idsToShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenSeason: PropTypes.func.isRequired,
};
