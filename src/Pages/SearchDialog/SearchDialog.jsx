import {useState} from 'react';  
import PropTypes from 'prop-types';
import "./SearchDialog.css"

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

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title'); // Default sort by title
  const [isAZSort, setIsAZSort] = useState(false); // Track if "A-Z" option is selected
  const [lastUpdatedSortDirection, setLastUpdatedSortDirection] = useState('asc'); // Track the sorting direction

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

  // Function to get the dynamic placeholder based on sortBy
  const getPlaceholder = () => {
    if (sortBy === 'title') {
      return 'Search by title';
    } else if (sortBy === 'genres') {
      return 'Search by genre';
    } else if (sortBy === 'lastUpdated') {
      return 'Search by title';
    }
  };

  // Filter and sort the showData based on searchQuery and sortBy
  const filteredAndSortedData = showData
    .filter((show) => {
      if (isAZSort) {
        const showFirstLetter = show.title.charAt(0).toLowerCase();
        return showFirstLetter === searchQuery.toLowerCase().charAt(0);
      } else if (sortBy === 'genres') {
        const showGenres = getGenres(show.genres).toLowerCase(); // Get the comma-separated genres as a lowercase string
        return showGenres.includes(searchQuery.toLowerCase());
      } else {
        const showTitle = show.title.toLowerCase();
        return showTitle.includes(searchQuery.toLowerCase());
      }
    })
    .sort((a, b) => {
      if (isAZSort) {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'lastUpdated') {
        if (lastUpdatedSortDirection === 'asc') {
          return new Date(a.updated) - new Date(b.updated);
        } else {
          return new Date(b.updated) - new Date(a.updated);
        }
      }
      return 0;
    });

  // Function to toggle the Last Updated sorting direction
  const toggleLastUpdatedSortDirection = () => {
    setLastUpdatedSortDirection(lastUpdatedSortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={`search-dialog ${isOpen ? 'open' : ''}`}>
      <div className="search-dialog-content">
        <img className="search-dialog-picture" src={"/rcstudiologo.jpg"}/>  
        <button onClick={onClose}>Close</button>
        <div className="search-select-input">
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={isAZSort ? 'az' : sortBy}
            onChange={(e) => {
              if (e.target.value === 'az') {
                setSortBy('title');
                setIsAZSort(true);
              } else {
                setSortBy(e.target.value);
                setIsAZSort(false);
              }
            }}
          >
            <option value="title">Sort by Title</option>
            <option value="genres">Sort by Genres</option>
            <option value="lastUpdated">Sort by Last Updated</option>
            <option value="az">A-Z</option>
          </select>
          {sortBy === 'lastUpdated' && (
            <button className="lastUpdated-button" onClick={toggleLastUpdatedSortDirection}>
              {lastUpdatedSortDirection === 'asc' ? 'Descending' : 'Ascending'}
            </button>
          )}
        </div>
        {filteredAndSortedData.length > 0 ? (
          <ul>
            {filteredAndSortedData.map((show, index) => (
              <li key={index}>
                <h2>{show.title}</h2>
                <img
                    className="search-dialog-image grow-on-hover"
                    src={show.image}
                    alt="Show Image"
                    srcSet={`${show.image} 1x, ${show.image2x} 2x`}
                    sizes="(max-width: 600px) 200px, 400px"
                    loading="lazy"
                  />                
                <p>{show.description}</p>
                <p>Genres: {getGenres(show.genres)}</p>
                <p>Seasons: {show.seasons}</p>
                <p>Last Updated: {formatDate(show.updated)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-error">
            <p>No matching results.</p>
            <p>Please check the spelling!</p>
          </div>
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
