import { PreviewShows, PreviewSeasons } from '../Helpers/Index_Components';
import PropTypes from 'prop-types';

/**
 * HomePreviewSection component for displaying a section of home page content.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.shows - An array of show data to be displayed.
 * @param {string} props.selectedShowId - The selected show's ID, if applicable.
 * @param {Function} props.handleShowClick - Callback function to handle show selection.
 *
 * @returns {JSX.Element} - A React component representing the HomePreviewSection.
 */
export default function HomePreviewSection({ shows, selectedShowId, handleShowClick }) {
  return (
    <section className="HomePreview">
      {/* Component to preview available shows and handle show selection */}
      <PreviewShows shows={shows} onShowClick={handleShowClick} />
      {selectedShowId ? (
        <div>
          {/* Component to preview seasons for the selected show */}
          <PreviewSeasons showId={selectedShowId} />
          {/* Component to display favorite shows */}
        </div>
      ) : null}
    </section>
  );
}

// Prop type validation for component props
HomePreviewSection.propTypes = {
  shows: PropTypes.array.isRequired,
  selectedShowId: PropTypes.string,
  handleShowClick: PropTypes.func.isRequired,
};
