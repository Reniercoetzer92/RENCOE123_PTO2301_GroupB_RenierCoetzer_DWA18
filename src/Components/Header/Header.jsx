import ShowList from "../ShowList/ShowList";
import ShowDisplay from "../ShowDisplay/ShowDisplay";
import "./Header.css"

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