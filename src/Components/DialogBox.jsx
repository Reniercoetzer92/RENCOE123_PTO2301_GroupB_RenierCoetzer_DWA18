import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './Components.css/DialogBox.css';

export default function DialogBox({ isOpen, onClose, content }) {
  const [matchingShows, setMatchingShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Make a request to the API to get all shows
      fetch('https://podcast-api.netlify.app/')
        .then((response) => response.json())
        .then((data) => {
          // Filter shows based on the search term
          const searchTerm = content.toLowerCase();
          const filteredShows = data.filter((show) => {
            const showId = show.id.toLowerCase();
            return showId.includes(searchTerm);
          });

          setMatchingShows(filteredShows);
        })
        .catch((error) => {
          console.error('Error fetching show data:', error);
          setMatchingShows([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMatchingShows([]);
    }
  }, [isOpen, content]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="dialog-box"
      overlayClassName="overlay"
    >
      <>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {loading ? (
          <sl-spinner style={{ fontSize: '2rem' }} />
        ) : (
          <>
            {matchingShows.length > 0 ? (
              matchingShows.map((show) => (
                <div key={show.id}>
                  <img src={show.image} alt={show.title} />
                  <h2>{show.title}</h2>
                  <p>{show.description}</p>
                  <p>Seasons: {show.seasons}</p>
                  <p>Genres: {show.genres.join(', ')}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>
                {content.trim() !== ''
                  ? 'No matching shows found.'
                  : 'Enter a search term to find shows.'}
              </p>
            )}
          </>
        )}
      </>
    </Modal>
  );
}

// Add prop type validations
DialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
