import { useState } from "react";
import { supabase } from "../../Helpers/Supabase_client";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

/**
 * Signup component for user registration.
 *
 * @returns {JSX.Element} - A React component representing the Signup form.
 */
const Signup = () => {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    joinedNewsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Event handler for form input changes
  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Attempt user registration with Supabase authentication
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
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Event handler for exit button click
  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        {/* Exit button */}
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src="/rcstudiologo.jpg" alt="Studio Logo" />
        <h2>Sign Up</h2>
        {/* Signup form */}
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
          {/* Submit button */}
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          {/* Login link */}
          <p>
            Already have an account?{' '}
            <span className="Log-In-link">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
        {/* Error message display */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;

