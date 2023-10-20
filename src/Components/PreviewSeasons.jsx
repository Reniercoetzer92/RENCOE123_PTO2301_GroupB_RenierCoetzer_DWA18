import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PreviewEpisodes from "./PreviewEpisodes";
import "./Components.css/PreviewSeasons.css";

/**
 * PreviewSeasons component displays information about a show's seasons and episodes.
 *
 * @param {Object} props - Component props.
 * @param {string} props.showId - The ID of the show to fetch season data for.
 * @returns {JSX.Element} - A React component representing the PreviewSeasons.
 */
export default function PreviewSeasons({ showId }) {
  const [showInfo, setShowInfo] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true); // Add loading state for the image
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Fetch show information
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setShowInfo(data);
        }
      })
      .catch((error) => console.error("Error fetching show data:", error));

    // Fetch season information
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.seasons)) {
          setSeasons(data.seasons);
        } else {
          setSeasons([]);
        }
      })
      .catch((error) => console.error("Error fetching season data:", error));

    setSelectedSeason(null);
    setIsLoadingImage(true);
  }, [showId]);

  /**
   * Handles the selection of a season from the dropdown.
   *
   * @param {Object} event - The event object.
   */
  const handleSeasonSelect = (event) => {
    const selectedSeasonId = parseInt(event.target.value);
    const selectedSeasonData = seasons.find(
      (season) => season.season === selectedSeasonId
    );
    setSelectedSeason(selectedSeasonData || null);

    // Simulate a 2-second delay before loading the image
    setIsLoadingImage(true);
    setTimeout(() => {
      setIsLoadingImage(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  return (
    <div className="PreviewSeasons">
      {showInfo && (
        <div>
          <h2>{showInfo.title}</h2>
          <p>{showInfo.description}</p>
          <button className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`} onClick={toggleFavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-star-fill ${isFavorited ? 'yellow' : 'white'}`} viewBox="0 0 16 14">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            Add To Favorites
          </button>
        </div>
      )}

      <select
        className="select-season"
        onChange={handleSeasonSelect}
        value={selectedSeason ? selectedSeason.season : ""}
      >
        <option value="">Select a Season</option>
        {seasons.map((season) => (
          <option key={season.season} value={season.season}>
            {season.title}
          </option>
        ))}
      </select>

      {selectedSeason && (
        <div className="PreviewSeasons-SeasonDetails">
          <h3>{selectedSeason.title}</h3>
          <p>{selectedSeason.description}</p>
          {isLoadingImage ? (
            <sl-spinner></sl-spinner>
          ) : (
            <img src={selectedSeason.image} alt={selectedSeason.title} />
          )}
          <PreviewEpisodes
            episodes={selectedSeason.episodes}
            seasonTitle={selectedSeason.title}
            showImage={selectedSeason.image}
          />
        </div>
      )}
    </div>
  );
}

PreviewSeasons.propTypes = {
  showId: PropTypes.string.isRequired,
};
