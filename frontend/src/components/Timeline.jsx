import React from "react";
import Draggable from "react-draggable";
 // Ensure this file contains styling for better visuals

const Timeline = ({ subtitles, videoDuration, onUpdateSubtitle }) => {
  return (
    <div className="timeline-container">
      {/* Time Ruler */}
      <div className="time-ruler">
        {Array.from({ length: Math.ceil(videoDuration / 5) + 1 }).map((_, index) => (
          <span key={index} className="time-marker" style={{ left: `${(index * 5 / videoDuration) * 100}%` }}>
            {index * 5}s
          </span>
        ))}
      </div>

      {/* Subtitle Track */}
      <div className="subtitle-track">
        {subtitles.map((sub, index) => (
          <Draggable
            key={index}
            axis="x"
            bounds="parent"
            grid={[1, 0]} // Smooth dragging
            defaultPosition={{ x: (sub.start / videoDuration) * 1000, y: 0 }}
            onStop={(e, data) => {
              const newStart = (data.x / 1000) * videoDuration;
              onUpdateSubtitle(index, newStart);
            }}
          >
            <div
              className="subtitle-block"
              style={{
                left: `${(sub.start / videoDuration) * 100}%`,
                width: `${((sub.end - sub.start) / videoDuration) * 100}%`
              }}
            >
              {sub.text}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
