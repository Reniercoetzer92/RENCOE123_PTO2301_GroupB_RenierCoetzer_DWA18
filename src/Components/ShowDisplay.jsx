import PropTypes from 'prop-types';

export default function ShowDisplay({ combinedData }) {
  return (
    <div>
      {combinedData.map((show, index) => (
        <div key={index}>
          <h2>{show.title}</h2>
          <h4>{show.description}</h4>
          <h1>{show.updated}</h1>
          {show.seasons.map((season) => (
            <div key={season.season}>
              <h3>{season.title}</h3>
              {season.episodes.map((episode) => (
                <div key={episode.episode}>
                  <h2>{episode.title}</h2>
                  <p>{episode.description}</p>
                  <p>Episode: {episode.episode}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

ShowDisplay.propTypes = {
  combinedData: PropTypes.array.isRequired,
};
