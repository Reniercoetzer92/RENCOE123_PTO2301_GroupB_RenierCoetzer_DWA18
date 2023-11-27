import { Signup, Login, Homepage, Landingzone } from "./Helpers/Index_Pages";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * Represents the main application component responsible for routing and managing user authentication.
 *
 * @component
 */
export default function App() {
  const [token, setToken] = useState(false);

  // Save the token to sessionStorage if it exists
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    // Retrieve the token from sessionStorage if it exists
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <div>
        <Routes>
          <Route path={'/'} element={<Landingzone />} />
          {token ? <Route path={'/Homepage'} element={<Homepage token={token} />} /> : null}
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/login'} element={<Login setToken={setToken} />} />
        </Routes>
    </div>
  );
}
