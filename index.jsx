import ReactDOM from "react-dom/client";
import HomePage from "./src/Pages/Home/Home";
import Modal from 'react-modal';

/**
 * Set the root element for the modal in the DOM.
 */
Modal.setAppElement('#root');

/**
 * Create a React root and render the HomePage component into it.
 */
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<HomePage />);
