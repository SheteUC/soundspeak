import React from "react";
import PropTypes from "prop-types";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, title }) => {
  if (!audioUrl) {
    return null;
  }

  return (
    <div className="audio-player">
      {title && <h4 className="song-title">{title}</h4>}
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
      <a href={audioUrl} download={`${title || "generated_song"}.mp3`} className="download-button">
        ⬇️ Download Song
      </a>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

AudioPlayer.defaultProps = {
  title: "",
};

export default AudioPlayer;
