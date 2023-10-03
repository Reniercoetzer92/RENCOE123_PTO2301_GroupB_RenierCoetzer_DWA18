import PropTypes from 'prop-types';

export default function ShowDisplay({ combinedData }) {
  return (
    <div>
      {combinedData.map(({title, index, description, updated}) => (
        <div key={index}>
          <h2>{title}</h2>
          <h4>{description}</h4>
          <h3>{title}</h3>
          <h1>{updated}</h1>
          {/* Render other show details as needed */}
        </div>
      ))}
    </div>
  );
}

ShowDisplay.propTypes = {
  combinedData: PropTypes.array.isRequired,
};
