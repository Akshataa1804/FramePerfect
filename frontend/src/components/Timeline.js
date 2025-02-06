import React, { useState } from 'react';

const Timeline = ({ subtitles, onSubtitleEdit }) => {
  const handleChange = (e, index) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index].text = e.target.value;
    onSubtitleEdit(newSubtitles);
  };

  return (
    <div>
      <h3>Subtitles</h3>
      <ul>
        {subtitles.map((sub, index) => (
          <li key={index}>
            <input
              type="text"
              value={sub.text}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Subtitle at ${sub.start} - ${sub.end}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
