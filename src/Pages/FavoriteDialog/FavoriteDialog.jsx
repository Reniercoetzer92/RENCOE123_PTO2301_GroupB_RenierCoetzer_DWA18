import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from "../../Helpers/Supabase_client";
import './FavouriteDialog.css';

export default function FavoriteDialog({ show, onClose, onRemoveFromFavorites,}) {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (selectedSeason) {
      setSeasonEpisodes(selectedSeason.episodes);
      setSelectedEpisode(null);
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
    setSelectedEpisode(null);
  };

  const confirmRemoveFromFavorites = async () => {
    if (showConfirmation) {
      setIsRemoving(true);

      try {
        // Call the onRemoveFromFavorites function to update the show's isFavourite status
        await onRemoveFromFavorites(show.id);

        // Check if isFavourite is false and remove it from Supabase
        if (!show.isFavourite) {
          await supabase.from('shows').delete().eq('id', show.id);
        }
      } catch (error) {
        console.error('Error removing show from favorites:', error);
      }

      setIsRemoving(false);
      onClose(); // Close the dialog after removal
    } else {
      // Show confirmation message
      setShowConfirmation(true);
    }
  };

  return (
    <div className="favorite-dialog">
      <div className="favorite-dialog-content">
        <button className="exit-button" onClick={onClose}>
          X
        </button>
        <button
          className={`remove-favorite-button ${isRemoving ? 'removing' : ''}`}
          onClick={confirmRemoveFromFavorites}
        >
          {showConfirmation ? 'Are you sure?' : isRemoving ? 'Removing...' : 'Remove from Favorites'}
        </button>

        <h2>{show.title}</h2>
        <p>{show.description}</p>

        <div className="season-selector">
          <label htmlFor="seasonDropdown">Select a Season:</label>
          <select
            className="select-season"
            onChange={handleSeasonChange}
            value={selectedSeason ? selectedSeason.seasons : ""}
          >
            <option value="" disabled>
              Select a Season
            </option>
            {show.seasons.map((season, index) => (
              <option key={index} value={index}>
                {season.title}
              </option>
            ))}
          </select>
        </div>

        {selectedSeason && (
          <div className="season">
            <p></p>
            <img src={selectedSeason.image} alt={`${selectedSeason.title} Image`} />
            <h4>{selectedSeason.title}</h4>
            <p>{selectedSeason.description}</p>

            <ul>
              {seasonEpisodes.map((episode) => (
                <li key={episode.title}>
                  {episode.title} -{' '}
                  <button onClick={() => handleListenClick(episode)}>Listen</button>
                  {selectedEpisode === episode && (
                    <div className="episode-details">
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <p>{episode.description}</p>
                      <div className="audio-player">
                        <audio controls onEnded={handlePlayerEnded}>
                          <source src={selectedEpisode.file} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

FavoriteDialog.propTypes = {
  show: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
