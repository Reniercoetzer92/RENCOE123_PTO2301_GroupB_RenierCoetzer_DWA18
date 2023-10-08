import ReactDOM from "react-dom/client";
import HomePage from "./src/Pages/Home/Home";
import Modal from 'react-modal'; 

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<HomePage />);
