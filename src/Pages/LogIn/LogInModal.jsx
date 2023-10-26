import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../SignUp/client';
import "./LogIn.css";

export default function LoginModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      if (error) {
        console.log("Full error object:", error); 
        if (error.message.includes('email')) {
          console.log("Invalid email address. Please check your email.");
        } else if (error.message.includes('password')) {
          console.log("Invalid password. Please check your password.");
        } 
      } else {
        console.log("You're logged in!", data);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later.");
    }
    onClose();
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleExit() {
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
            Sign Up
        </p>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
