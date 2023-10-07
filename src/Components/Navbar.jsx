import { useState } from 'react';
import "./Components.css/Navbar.css"

export default function Navbar() {
  
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', mode === 'light');

  };
  return (
      <nav>
        <div className="left-content">
          <a href="Home">
              <img src="../../../navbarlogo.png" width="100%" alt="Home"/>
          </a>
        </div>
        <ul className="right-content">
          <li><a href="./src/Pages/Sign-in/Sign-in.html">Sign in</a></li>
          <li><sl-button variant="default" size="small" circle onClick={toggleMode}>
            <sl-icon name="gear" label="Settings"></sl-icon>
          </sl-button></li>
        </ul>
      </nav>
  );
}
