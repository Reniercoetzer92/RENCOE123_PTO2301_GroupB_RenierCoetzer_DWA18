import { useState } from 'react';
import PropTypes from 'prop-types';
import "./LogIn.css";
import SignUpModal from '../SignUp/SignUpModal'; 
import LogInModal from './LogInModal'; 

export default function LoginModal({ onClose }) {
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    onClose();
  }

  function openSignUpDialog() {
    setShowLogInModal(false);
    setShowSignUpModal(true);
  }

  function handleExit() {
    setShowLogInModal(false);
    setShowSignUpModal(false);
    onClose();
  }

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src={"/rcstudiologo.jpg"} alt="Studio Logo" />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            required
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              name="rememberMe"
            />
            <label htmlFor="rememberMe">Remember Me?</label>
          </div>
          <button>Log in</button>
        </form>
        <p>Do not have an account? {" "}
          <span className="sign-up-link" onClick={openSignUpDialog} >
            Sign Up
          </span>
        </p>
      </div>
      {showSignUpModal && (
        <SignUpModal onClose={() => setShowSignUpModal(false)} />
      )}
      {showLogInModal && (
        <LogInModal onClose={() => setShowLogInModal(false)} />
      )}
    </div>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
