import {useState} from 'react'; // Import React
import PropTypes from 'prop-types';
import "./LogIn.css";

export default function LoginModal({ onClose }) {
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
    // submitToApi(formData)
    console.log(formData);
    onClose();
  }

  // Function to handle the exit action
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
            required="required"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            required="required"
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
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};