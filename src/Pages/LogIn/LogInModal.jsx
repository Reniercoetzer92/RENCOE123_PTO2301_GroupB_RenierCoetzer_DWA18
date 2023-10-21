import {useState, useEffect, createRef} from 'react';
import PropTypes from 'prop-types';
import "./LogIn.css";

export default function LoginModal({ onClose }) {
  const [formData, setFormData] = useState(
    {
        email: "", 
        password: "", 
        rememberMe: false,
    }
)

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

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    // submitToApi(formData)
    console.log(formData)
    onClose();
}

  const modalRef = createRef();

  return (
    <div className="login-modal">
      <div className="login-modal-content" ref={modalRef}>
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src={"/rcstudiologo.jpg"}/>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} >
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
          {/* <p>OR</p>
          <button>Sign up</button> */}
        </form>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
