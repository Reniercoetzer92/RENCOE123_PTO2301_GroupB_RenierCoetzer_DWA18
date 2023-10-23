import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from './client';
import { Link } from 'react-router-dom';
import './Signup.css';

export default function SignUpModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    joinedNewsletter: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log('Successfully signed up');
      try {
        const { data, error } = await supabase.auth.signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          joinedNewsletter: formData.joinedNewsletter,
        });
  
        if (error) {
          console.error('Sign-up error:', error);
          // Handle the error, e.g., display an error message to the user.
        } else {
          console.log('Sign-up successful:', data);
          // You can handle the successful sign-up here, e.g., redirect to another page.
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle unexpected errors here.
      }
    } else {
      console.log('Passwords do not match');
      return;
    }
  
    if (formData.joinedNewsletter) {
      console.log('Thanks for signing up for our newsletter!');
    }
    onClose();
  }

  function handleExit() {
    onClose();
  }

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src="/rcstudiologo.jpg" alt="Studio Logo" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Name"
            onChange={handleChange}
            name="name"
            value={formData.name}
          />
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
          <input
            required
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
          />
          <div className="form--marketing">
            <input
              id="okayToEmail"
              type="checkbox"
              name="joinedNewsletter"
              onChange={handleChange}
              checked={formData.joinedNewsletter}
            />
            <label htmlFor="okayToEmail">I want to join the newsletter</label>
            <p>already have an account? <Link to="/">Login</Link></p>
          </div>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
}

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
