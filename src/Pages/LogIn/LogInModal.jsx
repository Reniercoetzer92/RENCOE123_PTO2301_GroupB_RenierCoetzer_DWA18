import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./LogIn.css";

export default function LoginModal({ onLogin, onClose, onSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to close the modal when clicked outside of it
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const handleLogin = () => {
    // Implement your login logic here
    if (email && password) {
      onLogin(email, password);
    }
  };

  const modalRef = React.createRef(); // Create a ref for the modal

  return (
    <div className="login-modal">
      <div className="login-modal-content" ref={modalRef}>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src={"/rcstudiologo.jpg"}/>
        <h3>Login</h3>
        <form id="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log in</button>
          <p>OR</p>
          <button onClick={onSignUpClick}>Sign up</button>
        </form>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};


