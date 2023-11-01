import { useState } from "react";
import { supabase } from "../../Helpers/client";
import { Link, useNavigate} from "react-router-dom"
import './Signup.css'

export default function Signup() {
  let navigate = useNavigate() 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    joinedNewsletter: false,
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
    const { data, error } = await supabase.auth.signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      joinedNewsletter: formData.joinedNewsletter,
    });
    if (error) throw error
    console.log(data)
    alert('Check your email for verification link')

  } catch (error) {
    alert(error)
  }
}

function handleExit() {
  navigate('/')
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
          </div>
          <button onClick={handleChange}>Sign up</button>
            <p>
              Already have an account?{' '}
              <span className="Log-In-link">
                <Link to="/Login">Login</Link>
              </span>
            </p>
          </form>
        </div>
    </div>
  );}