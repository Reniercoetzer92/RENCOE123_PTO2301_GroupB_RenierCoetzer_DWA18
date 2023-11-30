// SearchDialog.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchDialog.css';

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

  const [searchQuery, setSearchQueryState] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [isAZSort, setIsAZSort] = useState(false);
  const [lastUpdatedSortDirection, setLastUpdatedSortDirection] = useState('asc');

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const getGenres = (genreNumbers) => {
    return genreNumbers.map((number) => Genres[number]).join(', ');
  };

  const setSearchQuery = (value) => {
    setSearchQueryState(value);
  };

  const getPlaceholder = () => {
    if (sortBy === 'title') {
      return 'Search by title';
    } else if (sortBy === 'genres') {
      return 'Search by genre';
    } else if (sortBy === 'lastUpdated') {
      return 'Search by title';
    }
  };

  const toggleLastUpdatedSortDirection = () => {
    setLastUpdatedSortDirection(lastUpdatedSortDirection === 'asc' ? 'desc' : 'asc');
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

  return (
    <div className={`search-dialog ${isOpen ? 'open' : ''}`}>
      <div className="search-dialog-content">
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
        <button onClick={onClose} className="close-button">X</button>
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

SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  showData: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
