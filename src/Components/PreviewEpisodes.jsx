import { useState } from 'react';
import PropTypes from "prop-types";
import "./Components.css/PreviewEpisodes.css";

/**
 * PreviewEpisodes component displays a list of episodes with the option to listen to each episode.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.episodes - An array of episode objects to display.
 * @returns {JSX.Element} - A React component representing the PreviewEpisodes.
 */
export default function PreviewEpisodes({ episodes }) {
  // State to track the selected episode for listening
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  /**
   * Handles a click event to listen to the selected episode.
   *
   * @param {Object} episode - The episode object to listen to.
   */
  const handleListenClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="PreviewEpisodes">
      <div>
        <h3>Episodes:</h3>
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

// Prop type validation for component props
PreviewEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      episode: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      file: PropTypes.string.isRequired,
    })
  ).isRequired,
};
