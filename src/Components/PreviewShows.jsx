import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CarouselCards } from "../Helpers/Index_Components";
import { supabase } from "../Helpers/Supabase_client";
import "./Components.css/PreviewShows.css";

export default function PreviewShows({ shows, onShowClick }) {
  const [selectedShow, setSelectedShow] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showIds, setShowIds] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);


  useEffect(() => {
    setShowIds(shows.map((show) => show.id));
  }, [shows]);

  useEffect(() => {
    // Load favorited show from local storage
    const favoritedShows = JSON.parse(localStorage.getItem("favoritedShows")) || {};
    const showId = selectedShow?.id;
    setIsFavorited(favoritedShows[showId] || false);
  }, [selectedShow]);

  const handleShowClick = (showId) => {
    setImageLoading(true);
    onShowClick(showId);
    setSelectedShow((prevSelected) =>
      prevSelected?.id === showId ? null : shows.find((show) => show.id === showId)
    );
    setShowAll(false);
    setTimeout(() => {
      setImageLoading(false);
    }, 2000);
  };

  const handleBackClick = () => {
    setSelectedShow(null);
    setShowAll(true);
  };

  const toggleFavorite = async () => {
    if (selectedShow) {
      const showId = selectedShow.id;
  
      try {
        // Get the current favorited status from local storage
        const favoritedShows = JSON.parse(localStorage.getItem("favoritedShows")) || {};
  
        // Toggle the favorited status
        const updatedIsFavorited = !favoritedShows[showId];
  
        // Update the favorited status in the state
        setIsFavorited(updatedIsFavorited);
  
        // Update the favorited status in local storage
        localStorage.setItem("favoritedShows", JSON.stringify({ ...favoritedShows, [showId]: updatedIsFavorited }));
  
        // Update the favorited status in the favorited_shows table
        await supabase
          .from("favorited_shows")
          .upsert([{ show_id: showId, is_favorited: updatedIsFavorited }]);
  
        // Conditionally add or remove the show from the shows table
        if (updatedIsFavorited) {
          await supabase
            .from("shows")
            .upsert([{ 
              id: selectedShow.id,
              title: selectedShow.title,
              description: selectedShow.description,
              genres: selectedShow.genres,
              image_url: selectedShow.image,
              seasons: selectedShow.seasons,
              updated_at: selectedShow.updated,
            }]);
        } else {
          await supabase
            .from("shows")
            .delete()
            .eq("id", showId);
        }
        } catch (error) {
          console.error("Error updating favorited status:", error);
        }
    }
  };  

  return (
    <div className="preview-shows">
      <h3>Featured:</h3>
      <ul>
        {showAll ? (
          <div>
            {/* Display the CarouselCards for all shows */}
            <CarouselCards idsToShow={showIds} onOpenSeason={handleShowClick} />
          </div>
        ) : (
          <div>
            {selectedShow && (
              <div className="preview-show-display">
                {imageLoading ? (
                  <sl-spinner></sl-spinner>
                ) : (
                  <div className="preview-show-Image">
                    {/* Display the selected show's image */}
                    <img
                      src={selectedShow.image}
                      alt={selectedShow.title}
                      rel="preload"
                      loading="lazy"
                    />
                  </div>
                )}
                <br />
                <button
                className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`}
                onClick={toggleFavorite}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-star-fill ${
                      isFavorited ? 'yellow' : 'white'
                    }`}
                    viewBox="0 0 16 14"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.390.73-.390.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  Add To Favorites
                </button>
                <br />
                <div className="preview-show-display">
                  <button onClick={handleBackClick}>Back</button>
                </div>
              </div>
            )}
          </div>
        )}
      </ul>
    </div>
  );
}

// Prop type validation for component props
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
