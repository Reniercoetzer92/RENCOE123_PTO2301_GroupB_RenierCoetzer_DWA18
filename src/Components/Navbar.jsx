import React from 'react';
import PropTypes from 'prop-types';
import "./Components.css/Navbar.css";
import SettingsModal from "../Pages/Setting/SettingsModal";
import HamburgerMenu from './HamburgerMenu';

export default function Navbar({ onSearchClick }) {
  const [mode, setMode] = React.useState('light');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(true);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsButtonEnabled(false); // Disable the button when the dialog is open
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
    setIsButtonEnabled(true); // Re-enable the button when the dialog is closed
  };

  const resetHamburger = () => {
    setIsSettingsModalOpen(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can perform logout actions (clearing sessions, etc.)
    // Close the modal
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
        {isSettingsModalOpen && (
        <SettingsModal onClose={closeSettingsModal} toggleMode={toggleMode} onLogout={handleLogout}/>
        )}
        <HamburgerMenu onSettingsClick={openSettingsModal} isButtonEnabled={isButtonEnabled} isMenuOpen={isSettingsModalOpen} resetHamburger={resetHamburger} />
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  onSearchClick: PropTypes.func,
  onLogout: PropTypes.func,
  onClose: PropTypes.func,
};
