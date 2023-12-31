import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CarouselCards } from "../Helpers/Index_Components";
import { supabase } from "../Helpers/Supabase_client";
import "./Components.css/PreviewShows.css";

/**
 * PreviewShows component for rendering a list of featured podcast shows with the option to view details.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.shows - Array of featured podcast shows.
 * @param {Function} props.onShowClick - Callback function to handle a show click.
 *
 * @returns {JSX.Element} - A React component representing the PreviewShows.
 */
export default function PreviewShows({ shows, onShowClick }) {
  // State variables
  const [selectedShow, setSelectedShow] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showIds, setShowIds] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update showIds when shows prop changes
    setShowIds(shows.map((show) => show.id));
  }, [shows]);

  useEffect(() => {
    // Fetch initial favorited status when selectedShow changes
    const fetchData = async () => {
      setLoading(true);

      if (selectedShow) {
        try {
          const { data, error } = await supabase
            .from("shows")
            .select("id, isFavourite")
            .eq("id", selectedShow.id);

          if (error) {
            console.error("Error fetching initial favorited status:", error);
            return;
          }

          const favoritedShow = data && data.length > 0 ? data[0] : null;
          setIsFavorited(favoritedShow?.isFavourite || false);
        } catch (error) {
          console.error("Error fetching initial favorited status:", error);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [selectedShow]);

  /**
   * Handles a click on a show preview image. Shows loading spinner and triggers onShowClick callback.
   *
   * @param {string} showId - ID of the clicked show.
   */
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

  /**
   * Handles a click on the "Back" button to go back to the list of featured shows.
   */
  const handleBackClick = () => {
    setSelectedShow(null);
    setShowAll(true);
  };

  /**
   * Toggles the favorited status of the selected show.
   */
  const toggleFavorite = async () => {
    if (selectedShow) {
      try {
        const updatedIsFavorited = !isFavorited;
        setIsFavorited(updatedIsFavorited);

        await supabase
          .from('shows')
          .upsert([
            {
              id: selectedShow.id,
              title: selectedShow.title,
              description: selectedShow.description,
              genres: selectedShow.genres,
              image_url: selectedShow.image,
              seasons: selectedShow.seasons,
              updated_at: selectedShow.updated,
              isFavourite: updatedIsFavorited,
              date_added: updatedIsFavorited ? new Date().toISOString() : null,
            },
          ]);

        if (!updatedIsFavorited) {
          await supabase.from('shows').delete().eq('id', selectedShow.id);
        }
      } catch (error) {
        console.error('Error updating favorited status:', error);
      }
    }
  };

  return (
    <div className="preview-shows">
      <h3>Featured:</h3>
      <ul>
        {loading ? (
          <div>Loading...</div>
        ) : showAll ? (
          <div>
            {/* Display a carousel of show previews */}
            <CarouselCards idsToShow={showIds} onOpenSeason={handleShowClick} />
          </div>
        ) : (
          <div>
            {/* Display selected show details */}
            {selectedShow && (
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
                {selectedShow && (
                  <button
                    className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`}
                    onClick={toggleFavorite}
                  >
                    {/* Star icon for favoriting */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-star-fill ${isFavorited ? 'yellow' : 'white'}`}
                      viewBox="0 0 16 14"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.830-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.390.73-.390.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.830 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {isFavorited ? 'Remove From Favorites' : 'Add To Favorites'}
                  </button>
                )}
                <br />
                <div className="preview-show-display">
                  {/* Button to go back to the list of featured shows */}
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
