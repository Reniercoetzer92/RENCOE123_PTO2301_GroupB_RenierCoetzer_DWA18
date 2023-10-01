//@ts-check

import { useState } from 'react';

export default function Navbar() {
  // Initialize the mode state with 'light' as the default
  const [mode, setMode] = useState('light');

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    // Toggle the mode based on the current mode
    setMode(mode === 'light' ? 'dark' : 'light');
    console.log('Mode set to:', mode);

    // Add or remove the dark-mode class from the body element
    document.body.classList.toggle('dark-mode', mode === 'light');

  };
  const handleAvatarClick = () => {
   
    alert('Avatar clicked!');
  };
  return (
    <div>
      <nav>
        <div id="left-content">
            <a href="Home"><img src="./src/Images/RCStudio.png" width="60%" alt="Logo"></img></a>
        </div>
        <ul id="right-content">
          <li><a href="Sign-in">Sign in</a></li>
          <li onClick={handleAvatarClick}>
              <a href="Avatar"><sl-avatar label="User avatar"></sl-avatar></a>
            </li>
          <li><a href="Sign-up">Sign up</a></li>
          
          <li><sl-button variant="default" size="small" circle onClick={toggleMode}>
            <sl-icon name="gear" label="Settings"></sl-icon>
          </sl-button></li>
        </ul>
      </nav>
    </div>
  );
}
