import ReactDOM from "react-dom/client";
import HomePage from "./src/Pages/Home/Home";

export default function App() {
  return <div>
          <HomePage />
          </div>  
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>);
