import {useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./Signup.css"

export default function SignUpModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:'',
    joinedNewsletter: true,
  });

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
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
    }))
}

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    if(formData.password === formData.confirmPassword) {
        console.log("Successfully signed up")
    } else {
        console.log("Passwords do not match")
        return
    }
    
    if(formData.joinedNewsletter) {
        console.log("Thanks for signing up for our newsletter!")
    }
    onClose()
}

const modalRef = useRef(); 

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <h1>Welcome</h1>
        <h1>To</h1>
        <img src={"/rcstudiologo.jpg"}/>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input 
                required="required"
                type="name"
                placeholder="Name"
                onChange={handleChange}
                name="name"
                value={formData.name}
              />
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
            <input 
                required="required"
                type="password" 
                placeholder="Confirm password"
                onChange={handleChange}
                name="confirmPassword"
                value={formData.confirm}
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
