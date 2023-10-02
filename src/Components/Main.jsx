import ReactDOM from "react-dom/client";
import HomePage from "../Pages/Home/Home";

export default function Main() {
  return <div>
          <HomePage />
          </div>  
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Main />);