import { useState } from "react";
import PropTypes from "prop-types"; 
import "./Components.css/PreviewEpisodes.css"

export default function PreviewEpisodes({ episodes }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleListenClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="PreviewEpisodes">
      <div>
        <h3>Episodes</h3>
        {episodes.map((episode, index) => (
          <div key={episode.episode}>
            {index + 1}. {episode.title} -{" "}
            <button onClick={() => handleListenClick(episode)}>Listen</button>
            {selectedEpisode === episode && (
              <div className="PreviewEpisodes-audio">
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

PreviewEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      episode: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      file: PropTypes.string.isRequired,
    })
  ).isRequired,
};
