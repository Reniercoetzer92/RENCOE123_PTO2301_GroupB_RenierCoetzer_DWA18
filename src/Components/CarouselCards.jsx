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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const responses = await Promise.all(idsToShow.map(id => fetch(`https://podcast-api.netlify.app/id/${id}`)));
        const data = await Promise.all(responses.map(response => response.json()));
        const images = data.map(d => d.image);
        setImageUrls(images.filter(url => url !== null));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchImageUrls();
  }, [idsToShow]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (carouselRef.current && imageUrls.length > 0) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
        carouselRef.current.selected = (currentSlide + 1) % imageUrls.length;
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
