import {useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CarouselCards } from "../Helpers/Index_Components";
import "./Components.css/PreviewShows.css";

/**
 * PreviewShows component displays a list of featured shows and allows users to click on a show to see more details.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.shows - An array of show objects to display.
 * @param {Function} props.onShowClick - A function to handle show click events.
 * @returns {JSX.Element} - A React component representing the PreviewShows.
 */
export default function PreviewShows({ shows, onShowClick }) {
  const [selectedShow, setSelectedShow] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showIds, setShowIds] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  /**
   * Handles a click event on a show, displaying show details.
   *
   * @param {string} showId - The ID of the clicked show.
   */
  const handleShowClick = (showId) => {
    setImageLoading(true);
    onShowClick(showId);
    setSelectedShow((prevSelected) =>
      prevSelected?.id === showId ? null : shows.find((show) => show.id === showId)
    );
    setShowAll(false);
    
    // Simulate a 2-second loading time
    setTimeout(() => {
      setImageLoading(false);
    }, 2000);
  };

  /**
   * Handles a click event to go back to the list of featured shows.
   */
  const handleBackClick = () => {
    setSelectedShow(null);
    setShowAll(true);
  };

  useEffect(() => {
    const ids = shows.map((show) => show.id);
    setShowIds(ids);
  }, [shows]);

  const toggleFavorite = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  return (
    <div className="preview-shows">
      <h3>Our Shows:</h3>
      <ul>
        {showAll ? (
          <div>
            <CarouselCards idsToShow={showIds} onOpenSeason={handleShowClick} />
          </div>
        ) : (
          <div>
            {selectedShow ? (
              <div className="preview-show-display">
                {imageLoading ? (
                  <sl-spinner></sl-spinner>
                ) : (
                  <div className="preview-show-Image">
                    <img
                      src={selectedShow.image}
                      alt={selectedShow.title}
                      rel="preload"
                      loading="lazy"
                    />
                  </div>
                )}
                <br />
                 <button className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`} onClick={toggleFavorite}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-star-fill ${isFavorited ? 'yellow' : 'white'}`} viewBox="0 0 16 14">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  Add To Favorites
                </button>
                <br />
                <div className="preview-show-display">
                  <button onClick={handleBackClick}>Back</button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </ul>
    </div>
  );
}

PreviewShows.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onShowClick: PropTypes.func.isRequired,
};
