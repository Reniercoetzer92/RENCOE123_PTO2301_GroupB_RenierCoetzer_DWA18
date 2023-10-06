import ShowList from "./ShowList";
import ShowDisplay from "./ShowDisplay";
import "./Components.css/Header.css"

export default function Header() {

  return (
    <div className="Header">
      <h1>Featured</h1>
          <ShowList>
            {(combinedData) => (
              <ShowDisplay combinedData={combinedData} />
            )}
          </ShowList>
    </div>
  );
}