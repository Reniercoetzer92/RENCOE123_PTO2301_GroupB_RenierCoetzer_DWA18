import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginModal from '../LogIn/LogInModal'; 
import SignUpModal from '../SignUp/SignUpModal'; 
import './SettingsModal.css';

export default function SettingsModal({ onClose, toggleMode, onLogout }) {
  const [currentMode, setCurrentMode] = useState('light');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); 

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
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
    toggleMode(newMode);
    
    const slider = document.querySelector('.toggler--slider');
    slider.classList.toggle('left');
    slider.classList.toggle('right');
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
  
      <div className="toggler">
        <p className={`toggler--light ${currentMode === 'light' ? 'light' : 'dark'}`}>Light</p>
        <div className="toggler--slider" onClick={handleToggleMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className={`toggler--dark ${currentMode === 'light' ? 'dark' : 'light'}`}>Dark</p>
      </div>

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
