import ReactDOM from "react-dom/client";
import HomePage from "../Pages/Home";

export default function Dialog() {
  return <div>
          <HomePage />
          </div>  
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Dialog />);