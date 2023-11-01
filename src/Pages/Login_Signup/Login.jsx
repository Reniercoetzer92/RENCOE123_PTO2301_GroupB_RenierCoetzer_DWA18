import { useState } from "react";
import { supabase } from "../../Helpers/client";
import { Link, useNavigate  } from "react-router-dom"
import PropTypes from 'prop-types';
import './Login.css'

export default function Login({ setToken }) {
let navigate = useNavigate()  
const [formData, setFormData] = useState({
  email: '',
  password: '',
  rememberMe: false,
});

function handleChange(event){
  setFormData((prevFormData)=>{
    return{
    ...prevFormData,
    [event.target.name]:event.target.value
    }
  }
  )
}

async function handleSubmit(event){
  event.preventDefault()
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });
    if (error) throw error
    console.log(data)
    alert('you are logged in successfully')
    setToken(data)
    navigate('/homepage')

  } catch (error) {
    alert(error)
  }
}

function handleExit() {
  navigate('/')
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
            value={formData.rememberMe}
          />
          <label htmlFor="rememberMe">Remember Me?</label>
        </div>
        <button>Log in</button>
      </form>
      <p>
          Do not have an account?{' '}
        <span className="Log-In-link">
            <Link to="/signup">Signup</Link>
          </span>
      </p>
    </div>
  </div>
);}

Login.propTypes = {
  setToken: PropTypes.func.isRequired, 
};