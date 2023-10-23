import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginModal from '../LogIn/LogInModal'; 
import SignUpModal from '../Signup/SignUpModal'; 
import './SettingsModal.css';

export default function SettingsModal({ onClose, toggleMode, onLogout }) {
  const [currentMode, setCurrentMode] = useState('night');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control the login dialog
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State to control the signup dialog

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleLogout = () => {
    openConfirmation();
  };

  const confirmLogout = () => {
    closeConfirmation();
    onClose();
    onLogout();
  };

  const handleToggleMode = () => {
    const newMode = currentMode === 'night' ? 'day' : 'night';
    setCurrentMode(newMode);
    toggleMode(newMode);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="settings-modal">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h2>Settings</h2>
      <button onClick={handleToggleMode} className={currentMode === 'night' ? 'night-button' : 'day-button'}>
        {currentMode === 'night' ? 'Dark mode' : 'Light mode'}
      </button>
      <p />
      <button onClick={openLoginModal}>Log in</button>
      <p />
      <button onClick={openSignUpModal}>Sign Up</button>
      <p />
      <button onClick={handleLogout}>Log Out</button>
      {isConfirmationOpen && (
        <div className="confirmation-modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={closeConfirmation}>No</button>
        </div>
      )}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
    </div>
  );
}

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
