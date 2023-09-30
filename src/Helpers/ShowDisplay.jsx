import PropTypes from 'prop-types';

export default function ShowDisplay({ combinedData }) {
  return (
    <div>
      {/* Render the combined data here */}
      {combinedData.map((show, index) => (
        <div key={index}>
          <h2>{show.title}</h2>
          <p>{show.description}</p>
          {/* Render other show details as needed */}
        </div>
      ))}
    </div>
  );
}

ShowDisplay.propTypes = {
  combinedData: PropTypes.array.isRequired,
};
