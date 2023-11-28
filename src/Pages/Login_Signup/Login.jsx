import { useState } from "react";
import { supabase } from "../../Helpers/Supabase_client";
import { Link, useNavigate  } from "react-router-dom"
import PropTypes from 'prop-types';
import './Login.css'

/**
 * The component for user login.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.setToken - A callback function to set the user's authentication token.
 */
export default function Login({ setToken }) {
  let navigate = useNavigate()  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles changes in the form input fields.
   *
   * @param {Event} event - The input change event.
   */
  function handleChange(event){
    setFormData((prevFormData)=>{
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }});
  }

  /**
   * Handles the form submission, attempts to log in the user.
   *
   * @param {Event} event - The form submit event.
   */
  async function handleSubmit(event){
    event.preventDefault()
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      if (error) throw error

      setToken(data);
      navigate("/homepage");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles the user's exit action from the login modal.
   */
  function handleExit() {
    navigate('/');
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          Do not have an account?{' '}
          <span className="Log-In-link">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
