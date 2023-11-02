import { useState } from "react";
import PropTypes from 'prop-types';
import { SettingsModal } from "../Helpers/Index_Pages";
import { HamburgerMenu } from '../Helpers/Index_Components';
import { useNavigate } from "react-router-dom";
import "./Components.css/Navbar.css";

/**
 * Navbar component for rendering the application's navigation bar.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onSearchClick - Callback function to handle search button click.
 *
 * @returns {JSX.Element} - A React component representing the Navbar.
 */
export default function Navbar({ onSearchClick }) {
  // React Router navigation
  let navigate = useNavigate();
  
  // State for managing light/dark mode
  const [mode, setMode] = useState('light');
  
  // State for controlling the visibility of the settings modal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  // State for controlling the enabled state of the hamburger menu button
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  /**
   * Toggles between light and dark mode and updates the body class accordingly.
   */
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');
  };

  /**
   * Handles the search button click event by invoking the provided callback.
   */
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  /**
   * Opens the settings modal and disables the hamburger menu button.
   */
  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsButtonEnabled(false);
  };

  /**
   * Closes the settings modal and re-enables the hamburger menu button.
   */
  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
    setIsButtonEnabled(true);
  };

  /**
   * Resets the hamburger menu state when the modal is closed.
   */
  const resetHamburger = () => {
    setIsSettingsModalOpen(false);
  };

  /**
   * Handles user logout by removing the token from session storage and navigating to the homepage.
   */
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
      <div className="left-content">
        <a href="homepage">
          <img src="/navbarlogo.png" alt="" />
        </a>
      </div>
      <div className="search-button">
        <button variant="default" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <ul className="right-content">
        {isSettingsModalOpen && (
          <SettingsModal onClose={closeSettingsModal} toggleMode={toggleMode} onLogout={handleLogout} />
        )}
        <HamburgerMenu
          onSettingsClick={openSettingsModal}
          isButtonEnabled={isButtonEnabled}
          isMenuOpen={isSettingsModalOpen}
          resetHamburger={resetHamburger}
        />
      </ul>
    </nav>
  );
}

// Prop type validation for component props
Navbar.propTypes = {
  onSearchClick: PropTypes.func,
};
