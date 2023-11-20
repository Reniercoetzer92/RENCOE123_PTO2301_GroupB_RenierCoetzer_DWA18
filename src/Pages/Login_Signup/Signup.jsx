import { useState } from "react";
import { supabase } from "../../Helpers/Supabase_client";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

/**
 * The component for user signup.
 *
 * @component
 */
export default function Signup() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    joinedNewsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles changes in the form input fields.
   *
   * @param {Event} event - The input change event.
   */
  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  /**
   * Handles the form submission, attempts to sign up the user.
   *
   * @param {Event} event - The form submit event.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        joinedNewsletter: formData.joinedNewsletter,
      });

      if (error) throw error;

      console.log(data);
      alert('Check your email for a verification link');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles the user's exit action from the signup modal.
   */
  function handleExit() {
    navigate('/');
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
              id="joinedNewsletter"
              type="checkbox"
              name="joinedNewsletter"
              onChange={handleChange}
              checked={formData.joinedNewsletter}
            />
            <label htmlFor="joinedNewsletter">I want to join the newsletter</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          <p>
            Already have an account?{' '}
            <span className="Log-In-link">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
