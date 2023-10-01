import ShowList from "../Helpers/ShowList";
import ShowDisplay from "../Helpers/ShowDisplay";

export default function Featured() {
  return (
    <div id="Featured">
      <h1>Featured</h1>
        <ShowList>
          {(combinedData) => (
            <ShowDisplay combinedData={combinedData} />
          )}
        </ShowList>
    </div>
  );
}