import {PreviewShows, PreviewSeasons, Favorites, Hero } from '../Helpers/Index_Components'; 
import PropTypes from 'prop-types'; 

export default function HomePreviewSection({ shows, selectedShowId, handleShowClick }) {
  return (
    <section className="HomePreview">
      <PreviewShows shows={shows} onShowClick={handleShowClick} />
      {selectedShowId ? (
        <div>
          <PreviewSeasons showId={selectedShowId} />
          <Favorites />
        </div>
      ) : (
        <section className="Hero">
          <Hero />
        </section>
      )}
    </section>
  );
}

HomePreviewSection.propTypes = {
  shows: PropTypes.array.isRequired, 
  selectedShowId: PropTypes.string, 
  handleShowClick: PropTypes.func.isRequired, 
};