import ReactDOM from "react-dom/client";
import HomePage from "./src/Pages/Home";
import Preview from "./src/Components/Preview"

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return <div>
          <HomePage />
          {/* <h2><Navbar /></h2>
          <h3><Header /></h3>
          <h4><Footer /></h4> */}
          <Preview />
        </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />);
