import { useState } from 'react';
import PropTypes from 'prop-types';
import "./Components.css/Navbar.css"

/**
 * Navbar component for displaying navigation and search functionality.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSearchClick - A function to handle search button click events.
 * @returns {JSX.Element} - A React component representing the Navbar.
 */
export default function Navbar({ onSearchClick }) {
  const [mode, setMode] = useState('light');

  /**
   * Toggles the display mode (light/dark) when the settings button is clicked.
   */
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');
  };

  /**
   * Handles the click event when the search button is clicked.
   */
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <nav>
      <div className="left-content">
        <a href="Home">
          <img src="/navbarlogo.png" alt="Home" />
        </a>
      </div>
      <div className="search-button">
        <button variant="default" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <ul className="right-content">
        <li><a href="./src/Pages/Sign-in/Sign-in.html">Sign in</a></li>
        <li>
          <sl-button variant="default" size="small" circle onClick={toggleMode}>
            <sl-icon name="gear" label="Settings"></sl-icon>
          </sl-button>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  onSearchClick: PropTypes.func,
};
