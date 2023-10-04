import { useState } from 'react';
import "./Navbar.css"

export default function Navbar() {
  
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');

  };
  const handleAvatarClick = () => {
   
    alert('Avatar clicked!');
  };
  return (
      <nav>
        <div className="left-content">
          <a href="Home">
              <img src="../src/Components/Navbar/Navbarlogo.png" width="100%" alt="Home"/>
          </a>
        </div>
        <div className="Search-bar">
            <form className="form-wrapper cf">
              <input type="text" placeholder="Search here..." />
                <button type="submit">Search</button>
            </form>
        </div>
        <ul className="right-content">
          <li><a href="./src/Pages/Sign-in/Sign-in.html">Sign in</a></li>
          <li onClick={handleAvatarClick}>
              <a href="Avatar"><sl-avatar label="User avatar"></sl-avatar></a>
            </li>
          <li><a href="Sign-up">Sign up</a></li>
          <li><sl-button variant="default" size="small" circle onClick={toggleMode}>
            <sl-icon name="gear" label="Settings"></sl-icon>
          </sl-button></li>
        </ul>
      </nav>
  );
}
