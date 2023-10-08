import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PreviewEpisodes from "./PreviewEpisodes";
import "./Components.css/PreviewSeasons.css";

export default function PreviewSeasons({ showId }) {
  const [showInfo, setShowInfo] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setShowInfo(data);
        }
      })
      .catch((error) => console.error("Error fetching show data:", error));

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
  }, [showId]);

  const handleSeasonSelect = (event) => {
    const selectedSeasonId = parseInt(event.target.value);
    const selectedSeasonData = seasons.find(
      (season) => season.season === selectedSeasonId
    );
    setSelectedSeason(selectedSeasonData || null);
  };

  return (
    <div className="PreviewSeasons">
      {showInfo && (
        <div className="PreviewSeasons-ShowInfo">
          <h2>{showInfo.title}</h2>
          <p>{showInfo.description}</p>
        </div>
      )}

      <select onChange={handleSeasonSelect} value={selectedSeason ? selectedSeason.season : ""}>
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
          <img src={selectedSeason.image} alt={selectedSeason.title} />
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
