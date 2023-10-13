import PropTypes from 'prop-types';

/**
 * Represents a search dialog component that displays a list of show data.
 *
 * @param {object} props - The component's props.
 * @param {function} props.onClose - A function to close the search dialog.
 * @param {array} props.showData - An array of show data to display in the dialog.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SearchDialog({ onClose, showData, isOpen }) {
  const Genres = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
  };

  /**
   * Formats a date string to the specified format.
   *
   * @param {string} inputDate - The input date string to format.
   * @returns {string} - The formatted date string.
   */
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /**
   * Gets a string representation of genres based on genre numbers.
   *
   * @param {array} genreNumbers - An array of genre numbers.
   * @returns {string} - A comma-separated string of genre names.
   */
  const getGenres = (genreNumbers) => {
    return genreNumbers.map((number) => Genres[number]).join(', ');
  };

  return (
    <div className={`search-dialog ${isOpen ? 'open' : ''}`}>
      <div className="search-dialog-content">
        <button onClick={onClose}>Close</button>
        {showData.length > 0 ? (
          <ul>
            {showData.map((show, index) => (
              <li key={index}>
                <h2>{show.title}</h2>
                <img className="search-dialog-image" src={show.image} alt="Show Image" />
                <p>Description: {show.description}</p>
                <p>Genres: {getGenres(show.genres)}</p>
                <p>Seasons: {show.seasons}</p>
                <p>Last Updated: {formatDate(show.updated)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

/**
 * PropTypes for the SearchDialog component.
 */
SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  showData: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
