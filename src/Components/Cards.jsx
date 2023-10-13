import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Components.css/Cards.css";

/**
 * Cards component displaying a carousel of podcast show images.
 *
 * @param {Object} props - The component's props.
 * @param {string[]} props.idsToShow - An array of show IDs to display.
 * @param {Function} props.onOpenSeason - A callback function to handle opening a season.
 *
 * @returns {JSX.Element} - A React component representing the Cards section.
 */
export default function Cards({ idsToShow, onOpenSeason }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
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
    const timer = setInterval(() => {
      if (carouselRef.current && imageUrls.length > 0) {
        const nextSlide = (currentSlide + 1) % imageUrls.length;
        setCurrentSlide(nextSlide);
        carouselRef.current.select(nextSlide, true);
      }
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, imageUrls]);

  return (
    <div>
      {imageUrls.length > 0 && (
        <sl-carousel
          autoplay
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
  idsToShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenSeason: PropTypes.func.isRequired,
};
