import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import "./SongStatus.css";

const statusMessages = {
  submitted: {
    text: "Your song generation request has been submitted.",
    color: "#2196F3",
    icon: "📤",
  },
  queued: {
    text: "Your request is in the queue.",
    color: "#FFC107",
    icon: "⏳",
  },
  streaming: {
    text: "Your song is being generated.",
    color: "#FF9800",
    icon: "🎶",
    showSpinner: true,
  },
  complete: {
    text: "Your song is ready!",
    color: "#4CAF50",
    icon: "✅",
  },
  error: {
    text: "There was an error generating your song. Please try again.",
    color: "#F44336",
    icon: "❌",
  },
};

const SongStatus = ({ status }) => {
  const currentStatus = statusMessages[status] || {
    text: "Unknown status.",
    color: "#9E9E9E",
    icon: "❓",
  };

  return (
    <div className="song-status" style={{ borderLeft: `4px solid ${currentStatus.color}` }}>
      <span className="status-icon" role="img" aria-label="status-icon">
        {currentStatus.icon}
      </span>
      <span className="status-text">{currentStatus.text}</span>
      {currentStatus.showSpinner && <Spinner />}
    </div>
  );
};

SongStatus.propTypes = {
  status: PropTypes.oneOf([
    "submitted",
    "queued",
    "streaming",
    "complete",
    "error",
  ]).isRequired,
};

export default SongStatus;
