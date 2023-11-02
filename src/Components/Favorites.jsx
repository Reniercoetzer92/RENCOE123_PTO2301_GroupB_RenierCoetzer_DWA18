import "./Components.css/Favorites.css";
import PropTypes from 'prop-types';
import { FavoriteCards } from "../Helpers/Index_Components";

/**
 * Favorites component for displaying a list of favorite shows.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.favoriteShows - An array of favorite show data to be displayed.
 * @param {Function} props.addToFavorites - A callback function to handle adding to favorites.
 *
 * @returns {JSX.Element} - A React component representing the Favorites section.
 */
export default function Favorites({ favoriteShows, addToFavorites }) {
  return (
    <div className="favorites-cards">
      <section className="Favorites">
        <h3>My Favorites:</h3>
      </section>
      <section className="cards">
        {/* Renders the FavoriteCards component with favorite show data and add function */}
        <FavoriteCards favoriteShows={favoriteShows} addToFavorites={addToFavorites} />
      </section>
    </div>
  );
}

// Prop type validation for component props
Favorites.propTypes = {
  favoriteShows: PropTypes.array,
  addToFavorites: PropTypes.func,
};
