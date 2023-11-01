import ReactDOM from "react-dom/client";
import React from "react";
import Modal from 'react-modal';
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";

/**
 * Set the root element for the modal in the DOM.
 */
Modal.setAppElement('#root');

/**
 * Create a React root and render the HomePage component into it.
 */
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
<React.StrictMode>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</React.StrictMode>
);
