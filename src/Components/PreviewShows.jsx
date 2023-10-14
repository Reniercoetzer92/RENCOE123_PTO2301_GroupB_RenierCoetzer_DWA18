import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CarouselCards from "./CarouselCards";
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

  return (
    <div className="preview-shows">
      <h3>Featured:</h3>
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
                    />
                  </div>
                )}
                <div>
                  <button className="preview-show-back-button" onClick={handleBackClick}>Back</button>
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
