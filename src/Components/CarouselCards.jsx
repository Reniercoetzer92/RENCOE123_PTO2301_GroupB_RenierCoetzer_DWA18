import React from 'react';
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [imageUrls, setImageUrls] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); 
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    const delay = setTimeout(() => {
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
        setIsLoading(false); 
      });
    }, 2000);

    return () => {
      clearTimeout(delay);
    }
  }, [idsToShow]);

  React.useEffect(() => {
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
        <sl-spinner></sl-spinner>
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
