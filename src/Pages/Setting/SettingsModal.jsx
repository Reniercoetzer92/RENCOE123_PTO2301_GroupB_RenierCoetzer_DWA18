import PropTypes from 'prop-types';
import { useState } from 'react';
import SignUpModal from "../Signup/SignUpModal";
import LoginModal from "../LogIn/LogInModal";
import './SettingsModal.css';

export default function SettingsModal({ onClose, toggleMode, onLogout,}) {
  const [currentMode, setCurrentMode] = useState('night');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
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
        <sl-icon name="gear" label="Settings"></sl-icon>
        {currentMode === 'night' ? 'Dark mode' : 'Light mode'}
      </button>
      <p></p>
      <button variant="default" onClick={openLoginModal}>Log in</button>
      <p></p>
      <button variant="default" onClick={openSignUpModal}>Sign Up</button>
      <p></p>
      <button onClick={onLogout}>Log Out</button>
      <p></p>
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
    </div>
  );
}

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
