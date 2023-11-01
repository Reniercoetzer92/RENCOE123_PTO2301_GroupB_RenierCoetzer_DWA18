import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PreviewEpisodes } from "../Helpers/Index_Components";
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

  return (
    <div className="PreviewSeasons">
      {showInfo && (
        <div>
          <h2>{showInfo.title}</h2>
          <p>{showInfo.description}</p>
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
            <img src={selectedSeason.image} alt={selectedSeason.title} rel="preload" loading="faster"/>
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
