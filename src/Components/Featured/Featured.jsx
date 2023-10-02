import ShowList from "../../Helpers/ShowList/ShowList";
import ShowDisplay from "../../Components/Featured/";

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
