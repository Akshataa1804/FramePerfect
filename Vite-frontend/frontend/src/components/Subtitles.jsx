import React from "react";

const Subtitles = ({ subtitles }) => {
  return (
    <div className="subtitles-container">
      <h3>Subtitles</h3>
      <div className="subtitles-list">
        {subtitles.map((subtitle, index) => (
          <div key={index} className="subtitle-item">
            <span className="subtitle-timestamp">{subtitle.timestamp}</span>
            <span className="subtitle-text">{subtitle.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subtitles;