import ReactDOM from "react-dom/client";
import React from "react";
import HomePage from "./src/Pages/Home/HomePage";
import Modal from 'react-modal';
import { BrowserRouter } from "react-router-dom";

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
    <HomePage />
  </BrowserRouter>
</React.StrictMode>
);
