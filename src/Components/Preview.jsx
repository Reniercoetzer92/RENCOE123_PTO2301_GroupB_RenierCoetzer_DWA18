import ShowList from "../Helpers/ShowList"
import ShowDisplay from "../Helpers/ShowDisplay"

export default function Preview() {
  return (
    <div>
      <h1>Show Information</h1>
      <ShowList>
        {(combinedData) => (
          <ShowDisplay combinedData={combinedData} />
        )}
      </ShowList>
    </div>
  );
}
