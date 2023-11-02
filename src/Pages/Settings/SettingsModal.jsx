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
  const [currentMode, setCurrentMode] = useState('light');
  const [isConfirmationLogoutOpen, setIsConfirmationLogoutOpen] = useState(false);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState(false);

  const openLogoutConfirmation = () => {
    setIsConfirmationLogoutOpen(true);
  };

  const closeLogoutConfirmation = () => {
    setIsConfirmationLogoutOpen(false);
  };

  const openResetConfirmation = () => {
    setIsConfirmationDeleteOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsConfirmationDeleteOpen(false);
  };

  const handleLogout = () => {
    openLogoutConfirmation();
  };

  const handleDelete = () => {
    openResetConfirmation();
  };

  const confirmLogout = () => {
    closeLogoutConfirmation();
    onClose();
    onLogout();
  };

  const confirmDelete = () => {
    closeDeleteConfirmation();
    onClose();
    onLogout();
  };

  const handleToggleMode = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
    toggleMode(newMode);

    const slider = document.querySelector('.toggler--slider');
    slider.classList.toggle('left');
    slider.classList.toggle('right');
  };

  return (
    <div className="settings-modal">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h2>Settings</h2>

      <div className="toggler">
        <p className={`toggler--light ${currentMode === 'light' ? 'light' : 'dark'}`}>Light</p>
        <div className="toggler--slider" onClick={handleToggleMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className={`toggler--dark ${currentMode === 'light' ? 'dark' : 'light'}`}>Dark</p>
      </div>
      <p />
      <button onClick={handleDelete}>Delete Profile</button>
      {isConfirmationDeleteOpen && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete your profile?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={closeDeleteConfirmation}>No</button>
        </div>
      )}
      <p />
      <button onClick={handleLogout}>Logout</button>
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
