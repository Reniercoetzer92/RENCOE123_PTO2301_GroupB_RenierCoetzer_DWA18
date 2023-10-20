import "./Components.css/Favorites.css";
import PropTypes from 'prop-types';
import FavoriteCards from "./FavoriteCards";

export default function Favorites({ favoriteShows, addToFavorites }) {
  return (
    <div className="favorites-cards">
      <section className="Favorites">
        <h3>My Favorites:</h3>
      </section>
      <section className="cards">
        <FavoriteCards favoriteShows={favoriteShows} addToFavorites={addToFavorites} />
      </section>
    </div>
  );
}

Favorites.propTypes = {
  favoriteShows: PropTypes.array.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};