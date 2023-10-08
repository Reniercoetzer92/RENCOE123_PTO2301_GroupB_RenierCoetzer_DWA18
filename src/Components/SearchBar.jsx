import  { useState } from 'react';
import './Components.css/SearchBar.css';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    // Pass the search query to the parent component for handling
    onSearch(searchQuery);
  };

  return (
    <div className="Search-bar">
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit" onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
