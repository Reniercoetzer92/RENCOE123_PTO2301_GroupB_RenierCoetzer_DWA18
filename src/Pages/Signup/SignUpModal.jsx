import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import "./Signup.css"

export default function SignUpModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // You can implement your form submission logic here
    // For example, you can make an API call to register the user
    console.log('Form data submitted:', formData);

    onClose();
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const modalRef = useRef(); 

  return (
    <div className="signup-modal">
      <div className="signup-modal-content" ref={modalRef}>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src={"/rcstudiologo.jpg"}/>
        <h2>Sign Up</h2>
        <form id="signup-form">
          <input
            id="signup-name"
            name="name"
            className="text-input"
            placeholder="Name"
            required
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            id="signup-email"
            name="email"
            className="email-input"
            placeholder="Email address"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            id="signup-password"
            name="password"
            className="password-input"
            placeholder="Password"
            required
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="continue-button"
            type="button"
            id="signup-button"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
