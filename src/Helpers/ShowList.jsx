import { useEffect, useState, useRef } from 'react';
import './ShowList/ShowList.css';
import Body from '../Components/Body'; // Import the Body component

export default function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarousel, setShowCarousel] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [showBody, setShowBody] = useState(true); // State to control the visibility of the Body section
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        const showIds = data.map((preview) => preview.id);

        Promise.all(showIds.map((id) => fetch(`https://podcast-api.netlify.app/id/${id}`).then((response) => response.json())))
          .then((detailedData) => {
            setShows(detailedData);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching detailed data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching PREVIEW data:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSlideClick = (index) => {
    setShowCarousel(false); // Hide the carousel
    setSelectedSlide(index);
    setShowBody(false); // Hide the Body section
  };

  const closeDialog = () => {
    setShowCarousel(true); // Show the carousel again
    setSelectedSlide(null);
    setShowBody(true); // Show the Body section
  };

  return (
    <div>
      {loading ? (
        <div className="carousel-container">
          <sl-spinner></sl-spinner>
        </div>
      ) : (
        <div>
          {selectedSlide !== null && (
            <div className="modal-content">
              <img
                src={shows[selectedSlide].image}
                alt={`Slide ${selectedSlide + 1}`}
                className={`modal-image smaller-image`} // Apply both classes
              />
              <h2>{shows[selectedSlide].title}</h2>
              <p>{shows[selectedSlide].description}</p>
              <button onClick={closeDialog}>Close</button>
            </div>
          )}
          {showCarousel && (
            <sl-carousel
              ref={carouselRef}
              navigation
              pagination
              slides-per-page="5"
              slides-per-move="3"
              loop={true}
            >
              {shows.map((show, index) => (
                <sl-carousel-item
                  key={index}
                  className="carousel-item"
                  onClick={() => handleSlideClick(index)}
                >
                  <a href={show.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={show.image}
                      alt={`Slide ${index + 1}`}
                      className="carousel-image"
                      loading="lazy"
                    />
                  </a>
                </sl-carousel-item>
              ))}
            </sl-carousel>
          )}
          {showBody && <Body/>}
        </div>
      )}
    </div>
  );
}
