// SearchDialog.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchDialog.css';

/**
 * SearchDialog component for displaying a search dialog with filtering and sorting options.
 * @param {Object} props - The component's props.
 * @param {Function} props.onClose - Callback function to close the search dialog.
 * @param {Array} props.showData - Array of show data to be displayed and filtered.
 * @param {boolean} props.isOpen - Flag to determine if the search dialog is open or closed.
 * @returns {JSX.Element} - A React component representing the SearchDialog.
 */
export default function SearchDialog({ onClose, showData, isOpen }) {
  // Genres mapping for display
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

  // Genres array for buttons
  const Genres_array = [
    "Personal Growth",
    "Fiction",
    "True Crime and Investigative Journalism",
    "Kids and Family",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "News",
  ];

  // State for search query
  const [searchQuery, setSearchQueryState] = useState('');
  // State for sorting by title, genres, or lastUpdated
  const [sortBy, setSortBy] = useState('title');
  // State for A-Z sorting
  const [isAZSort, setIsAZSort] = useState(false);
  // State for sorting direction by lastUpdated
  const [lastUpdatedSortDirection, setLastUpdatedSortDirection] = useState('asc');

  /**
   * Format date in the format DD/MM/YYYY.
   * @param {string} inputDate - The input date string.
   * @returns {string} - Formatted date string.
   */
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /**
   * Get genres as a comma-separated string.
   * @param {Array} genreNumbers - Array of genre numbers.
   * @returns {string} - Comma-separated string of genres.
   */
  const getGenres = (genreNumbers) => {
    return genreNumbers.map((number) => Genres[number]).join(', ');
  };

  /**
   * Set the search query state.
   * @param {string} value - The new search query.
   */
  const setSearchQuery = (value) => {
    setSearchQueryState(value);
  };

  /**
   * Get placeholder text based on the current sorting option.
   * @returns {string} - Placeholder text.
   */
  const getPlaceholder = () => {
    if (sortBy === 'title') {
      return 'Search by title';
    } else if (sortBy === 'genres') {
      return 'Search by genre';
    } else if (sortBy === 'lastUpdated') {
      return 'Search by title';
    }
  };

  /**
   * Toggle the sorting direction by lastUpdated.
   */
  const toggleLastUpdatedSortDirection = () => {
    setLastUpdatedSortDirection(lastUpdatedSortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Alphabet for filtering buttons
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Filtered and sorted data based on search query, sorting, and filters
  const filteredAndSortedData = showData
    .filter((show) => {
      if (isAZSort) {
        const showFirstLetter = show.title.charAt(0).toLowerCase();
        return showFirstLetter === searchQuery.toLowerCase().charAt(0);
      } else if (sortBy === 'genres') {
        const showGenres = getGenres(show.genres).toLowerCase();
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

  // JSX structure for the SearchDialog component
  return (
    <div className={`search-dialog ${isOpen ? 'open' : ''}`}>
      <div className="search-dialog-content">
        {/* Alphabet buttons for filtering */}
        <div className="alphabet-buttons">
          {alphabet.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => setSearchQuery(letter)}
              className={searchQuery.toLowerCase() === letter.toLowerCase() ? 'selected' : ''}
            >
              {letter}
            </button>
          ))}
        </div>
        {/* Close button */}
        <button onClick={onClose} className="close-button">X</button>
        {/* Search input and sorting options */}
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
          {/* Toggle sorting direction for lastUpdated */}
          {sortBy === 'lastUpdated' && (
            <button className="lastUpdated-button" onClick={toggleLastUpdatedSortDirection}>
              {lastUpdatedSortDirection === 'asc' ? 'Descending' : 'Ascending'}
            </button>
          )}
        </div>
        {/* Genre buttons for filtering */}
        {sortBy === 'genres' && (
          <div className="genres-buttons">
            {Genres_array.map((genre, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(genre)}
                className={searchQuery.toLowerCase() === genre.toLowerCase() ? 'selected' : ''}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
        {/* Display filtered and sorted data */}
        {filteredAndSortedData.length > 0 ? (
          <ul>
            {filteredAndSortedData.map((show, index) => (
              <li key={index}>
                <h2>{show.title}</h2>
                <img
                  className="search-dialog-image"
                  src={show.image}
                  alt="Show Image"
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

// PropTypes for type-checking component props
SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  showData: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
