import ShowList from "../../Helpers/ShowList/ShowList";
import ShowDisplay from "../../Helpers/ShowDisplay/ShowDisplay";
import "./Featured.css"

export default function Featured() {

  return (
    <div className="Featured">
      <h1>Featured</h1>
        <ShowList>
          {(combinedData) => (
            <ShowDisplay combinedData={combinedData} />
          )}
        </ShowList>
    </div>
  );
}
