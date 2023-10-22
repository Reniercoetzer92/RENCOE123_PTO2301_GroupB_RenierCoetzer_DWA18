import PreviewShows from './PreviewShows'; 
import PropTypes from 'prop-types'; 
import PreviewSeasons from './PreviewSeasons';
import Favorites from './Favorites';
import Hero from './Hero';

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