export default function Navbar() {
  return  <nav>
            <div className="left-content">
              <div className="logo">
                <img src="./src/Images/RC Studio.jpg" alt="Logo" />
              </div>
              <div className="description">
                <h1>Podcast</h1>
              </div>
            </div>
            <ul className="right-content">
              <li><a href="Log-in">Login</a></li>
              <li><a href="Sign-up">Signup</a></li>
              <button onClick="" className="setting-button">Setting</button>
            </ul>
        </nav>
}
 