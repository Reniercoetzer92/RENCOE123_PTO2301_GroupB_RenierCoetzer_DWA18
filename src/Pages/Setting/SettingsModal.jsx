import {useState} from 'react';
import PropTypes from 'prop-types';
import SignUpModal from "../Signup/SignUpModal";
import LoginModal from "../LogIn/LogInModal";
import './SettingsModal.css';

export default function SettingsModal({ onClose, toggleMode, onLogout }) {
  const [currentMode, setCurrentMode] = useState('night');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

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

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <button onClick={handleToggleMode} className={currentMode === 'night' ? 'night-button' : 'day-button'}>
        {currentMode === 'night' ? 'Dark mode' : 'Light mode'}
      </button>
      <p/>
      <button variant="default" onClick={openLoginModal}>Log in</button>
      <p/>
      <button variant="default" onClick={openSignUpModal}>Sign Up</button>
      <p/>
      <button onClick={handleLogout}>Log Out</button>
      <p/>
      <button onClick={onClose}>Close</button>
      {isLoginModalOpen && (
        <LoginModal
          onLogin={(email, password) => {
            // Implement your login logic here
            console.log('Login with email:', email, 'and password:', password);
          }}
          onClose={closeLoginModal}
        />
      )}
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
      {isConfirmationOpen && (
        <div className="confirmation-modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={closeConfirmation}>No</button>
        </div>
      )}
    </div>
  );
}

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
