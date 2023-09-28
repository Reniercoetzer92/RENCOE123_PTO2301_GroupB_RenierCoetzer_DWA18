import ReactDOM from "react-dom/client";
import Navbar from "./src/Components/Navbar";
import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return <div>
          <h1><Navbar /></h1>
          <h2><Header /></h2>
          <h3><Footer /></h3>
        </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />);
