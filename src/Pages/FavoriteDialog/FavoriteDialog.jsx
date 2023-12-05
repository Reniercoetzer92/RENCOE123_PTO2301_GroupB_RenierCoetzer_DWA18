import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from "../../Helpers/Supabase_client";
import './FavouriteDialog.css';

/**
 * FavoriteDialog component for rendering details of a favorite show and allowing removal from favorites.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.show - The favorite show object.
 * @param {Function} props.onClose - Callback function to close the dialog.
 * @param {Function} props.onRemoveFromFavorites - Callback function to remove the show from favorites.
 *
 * @returns {JSX.Element} - A React component representing the FavoriteDialog.
 */
export default function FavoriteDialog({ show, onClose, onRemoveFromFavorites }) {
  // State variables
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Update seasonEpisodes when selectedSeason changes
    if (selectedSeason) {
      setSeasonEpisodes(selectedSeason.episodes);
      setSelectedEpisode(null);
    }
  }, [selectedSeason]);

  /**
   * Handles the change of the selected season from the dropdown.
   *
   * @param {Object} event - The change event from the season dropdown.
   */
  const handleSeasonChange = (event) => {
    const selectedSeasonIndex = parseInt(event.target.value, 10);
    setSelectedSeason(show.seasons[selectedSeasonIndex]);
  };

  /**
   * Handles the click event for the "Listen" button on an episode.
   *
   * @param {Object} episode - The selected episode.
   */
  const handleListenClick = (episode) => {
    setSelectedEpisode(episode);
  };

  /**
   * Handles the end event of the audio player.
   */
  const handlePlayerEnded = () => {
    setSelectedEpisode(null);
  };

  /**
   * Confirms the removal from favorites and triggers the removal process.
   */
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
        {/* Close button */}
        <button className="exit-button" onClick={onClose}>
          X
        </button>
        {/* Remove from favorites button */}
        <button
          className={`remove-favorite-button ${isRemoving ? 'removing' : ''}`}
          onClick={confirmRemoveFromFavorites}
        >
          {showConfirmation ? 'Are you sure?' : isRemoving ? 'Removing...' : 'Remove from Favorites'}
        </button>

        {/* Show title and description */}
        <h2>{show.title}</h2>
        <p>{show.description}</p>

        {/* Season selector dropdown */}
        <div className="season-selector">
          <label htmlFor="seasonDropdown"></label>
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

        {/* Display selected season details and episodes */}
        {selectedSeason && (
          <div className="season">
            <p></p>
            <img src={selectedSeason.image} alt={`${selectedSeason.title} Image`} />
            <h4>{selectedSeason.title}</h4>
            <p>{selectedSeason.description}</p>

            {/* List of episodes */}
            <ul>
              {seasonEpisodes.map((episode) => (
                <li key={episode.title}>
                  {episode.title} -{' '}
                  <button onClick={() => handleListenClick(episode)}>Listen</button>
                  {/* Display episode details if selected */}
                  {selectedEpisode === episode && (
                    <div className="episode-details">
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <p>{episode.description}</p>
                      {/* Audio player */}
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

// Prop type validation for component props
FavoriteDialog.propTypes = {
  show: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};
