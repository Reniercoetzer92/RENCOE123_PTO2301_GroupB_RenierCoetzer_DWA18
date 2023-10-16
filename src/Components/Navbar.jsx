import { useState } from 'react';
import PropTypes from 'prop-types';
import "./Components.css/Navbar.css";
import SignUpModal from "../Pages/Signup/SignUpModal";
import LoginModal from "../Pages/LogIn/LogInModal";

export default function Navbar({ onSearchClick }) {
  const [mode, setMode] = useState('light');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
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
        <button variant="default" onClick={openLoginModal}>Login</button>
        <button variant="default" onClick={openSignUpModal}>Sign Up</button>
        <li>
          <sl-button variant="default" size="small" circle onClick={toggleMode}>
            <sl-icon name="gear" label="Settings"></sl-icon>
          </sl-button>
        </li>
      </ul>

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
    </nav>
  );
}

Navbar.propTypes = {
  onSearchClick: PropTypes.func,
};
