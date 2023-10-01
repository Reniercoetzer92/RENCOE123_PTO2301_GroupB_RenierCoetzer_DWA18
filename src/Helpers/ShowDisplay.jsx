import PropTypes from 'prop-types';

export default function ShowDisplay({ combinedData }) {
  return (
    <div>
      {combinedData.map((show, index) => (
        <div key={index}>
          <h2>{show.title}</h2>
          <h4>{show.description}</h4>
          {/* Render other show details as needed */}
        </div>
      ))}
    </div>
  );
}

ShowDisplay.propTypes = {
  combinedData: PropTypes.array.isRequired,
};
