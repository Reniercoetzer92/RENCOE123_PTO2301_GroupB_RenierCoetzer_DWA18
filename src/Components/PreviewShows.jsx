import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cards from "./Cards";

export default function PreviewShows({ shows, onShowClick }) {
  const [ setSelectedShow] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showIds, setShowIds] = useState([]);

  const handleShowClick = (showId) => {
    onShowClick(showId);
    setSelectedShow((prevSelected) =>
      prevSelected?.id === showId ? null : shows.find((show) => show.id === showId)
    );
    setShowAll(false);
  };

  const handleBackClick = () => {
    setSelectedShow(null);
    setShowAll(true);
  };

  useEffect(() => {
    // Extract the IDs of shows from the data
    const ids = shows.map((show) => show.id);
    setShowIds(ids);
  }, [shows]);

  return (
    <div className="PreviewShows">
      <h2>Featured:</h2>
      <ul>
        {showAll && (
          <div>
            <Cards idsToShow={showIds} onOpenSeason={handleShowClick} />
          </div>
        )}
        {!showAll && (
          <div>
            <button onClick={handleBackClick}>Back</button>
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
