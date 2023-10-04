import { useEffect, useState, useRef } from 'react';
import './ShowList.css';
import Hero from '../../Components/Hero/Hero';

export default function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarousel, setShowCarousel] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [showBody, setShowBody] = useState(true);
  const [seasonData, setSeasonData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const carouselRef = useRef(null);
 
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
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

  const handleSlideClick = async (index) => {
    setShowCarousel(false);
    setSelectedSlide(index);
    setShowBody(false);

    // Fetch season data based on the selected show's ID
    const showId = shows[index].id;
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      if (response.ok) {
        const seasonData = await response.json();
        setSeasonData(seasonData.seasons); // Assuming the season data is in a "seasons" property
      } else {
        console.error('Failed to fetch season data');
      }
    } catch (error) {
      console.error('Error fetching season data:', error);
    }
  };

  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
  };

  const closeDialog = () => {
    setShowCarousel(true);
    setSelectedSlide(null);
    setShowBody(true);
    setSeasonData([]);
    setSelectedSeason(null);
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
                className={`modal-image smaller-image`}
              />
              <h2>{shows[selectedSlide].title}</h2>
              <p>{shows[selectedSlide].description}</p>
              <p>Last Update:<sl-format-date date={shows[selectedSlide].updated}></sl-format-date></p>
              <button onClick={closeDialog}>Close</button>
              <h2>{shows[selectedSlide].episode}</h2>
            
              <select
                  id="seasonSelect"
                  placeholder="Select a season"
                  value={selectedSeason || ''}
                  onChange={handleSeasonChange}
                >
                  <option value="">Select a season</option>
                  {seasonData.map((season, index) => (
                    <option key={index} value={season.season}>
                      {season.season}
                    </option>
                  ))}
              </select>
              
              <div className="card">
              <sl-card class="card-overview">
              <img
                slot="image"
                src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                alt="A kitten sits patiently between a terracotta pot and decorative grasses."
              />

                <strong>Title</strong><br />
                description<br />
                <small>file</small>
      
                <div slot="footer">
                  <sl-button variant="primary" pill>Play</sl-button>
                  <sl-rating></sl-rating>
                </div>
              </sl-card>
              </div>

              
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
          {showBody && selectedSeason && (
            <div className="episode-carousel">
              {/* Display episodes for the selected season */}
              <h2>Episodes for Season {selectedSeason}</h2>
              {/* Map and display episode data here */}
              {seasonData
                .find((season) => season.season === selectedSeason)
                .episodes.map((episode, index) => (
                  <div key={index}>
                    <h3>Episode {episode.episode}</h3>
                    <p>{episode.title}</p>
                    <audio controls>
                      <source src={episode.file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
            </div>
          )}
          {showBody && !selectedSeason && <Hero />}
        </div>
      )}
    </div>
  );
}
