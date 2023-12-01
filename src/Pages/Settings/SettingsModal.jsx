// SettingsModal.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import './SettingsModal.css';

/**
 * Represents a settings modal component with options for mode switching and user actions.
 *
 * @param {object} props - The component's props.
 * @param {function} props.onClose - A function to close the settings modal.
 * @param {function} props.toggleMode - A function to toggle between light and dark modes.
 * @param {function} props.onLogout - A function to handle user logout.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SettingsModal({ onClose, toggleMode, onLogout }) {
  // State to track the current mode (light or dark)
  const [currentMode, setCurrentMode] = useState('light');
  // State to manage the logout confirmation modal
  const [isConfirmationLogoutOpen, setIsConfirmationLogoutOpen] = useState(false);

  // Open logout confirmation modal
  const openLogoutConfirmation = () => {
    setIsConfirmationLogoutOpen(true);
  };

  // Close logout confirmation modal
  const closeLogoutConfirmation = () => {
    setIsConfirmationLogoutOpen(false);
  };

  // Handle user click on logout button
  const handleLogout = () => {
    openLogoutConfirmation();
  };

  // Confirm user logout
  const confirmLogout = () => {
    closeLogoutConfirmation();
    onClose();
    onLogout();
  };

  // Handle toggling between light and dark modes
  const handleToggleMode = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
    toggleMode(newMode);

    // Toggle the visual slider
    const slider = document.querySelector('.toggler--slider');
    slider.classList.toggle('left');
    slider.classList.toggle('right');
  };

  // JSX structure for the SettingsModal component
  return (
    <div className="settings-modal">
      {/* Close button */}
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {/* Title */}
      <h2>Settings</h2>

      {/* Mode toggler */}
      <div className="toggler">
        <p className={`toggler--light ${currentMode === 'light' ? 'light' : 'dark'}`}>Light</p>
        <div className="toggler--slider" onClick={handleToggleMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className={`toggler--dark ${currentMode === 'light' ? 'dark' : 'light'}`}>Dark</p>
      </div>

      {/* Logout button */}
      <p />
      <button onClick={handleLogout}>Logout</button>

      {/* Logout confirmation modal */}
      {isConfirmationLogoutOpen && (
        <div className="confirmation-modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={closeLogoutConfirmation}>No</button>
        </div>
      )}
    </div>
  );
}

/**
 * PropTypes for the SettingsModal component.
 */
SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
