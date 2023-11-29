import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FavouriteDialog.css';

export default function FavoriteDialog({ show, onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    if (selectedSeason) {
      setSeasonEpisodes(selectedSeason.episodes);
    }
  }, [selectedSeason]);

  const handleSeasonChange = (event) => {
    const selectedSeasonIndex = parseInt(event.target.value, 10);
    setSelectedSeason(show.seasons[selectedSeasonIndex]);
  };

  const handleListenClick = (episode) => {
    setSelectedEpisode(episode);
  };

  const handlePlayerEnded = () => {
    // Handle the end of the episode, reset selectedEpisode
    setSelectedEpisode(null);
  };

  return (
    <div className="favorite-dialog">
      <div className="favorite-dialog-content">
        <button className="exit-button" onClick={onClose}>
          Close
        </button>
        <h4>{show.title}</h4>
        <p>{show.description}</p>

        <div className="season-selector">
          <label htmlFor="seasonDropdown"></label>
          <select
            className="select-season"
            onChange={handleSeasonChange}
            value={selectedSeason ? selectedSeason.season : ""}
          >
            <option value="" disabled>Select a Season</option>
            {show.seasons.map((season, index) => (
              <option key={index} value={index}>
                {season.name}
              </option>
            ))}
          </select>

        </div>

        {selectedSeason && (
          <div className="season">
            <img src={selectedSeason.image} alt={`${selectedSeason.title} Image`} />
            <h5>{selectedSeason.title}</h5>
            <p>{selectedSeason.description}</p>

            <ul>
              {seasonEpisodes.map((episode) => (
                <li key={episode.title}>
                  {episode.title} -{' '}
                  <button onClick={() => handleListenClick(episode)}>Listen</button>
                </li>
              ))}
            </ul>

            {selectedEpisode && (
              <div className="audio-player">
                <h6>{selectedEpisode.title}</h6>
                <audio controls onEnded={handlePlayerEnded}>
                  <source src={selectedEpisode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

FavoriteDialog.propTypes = {
  show: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
