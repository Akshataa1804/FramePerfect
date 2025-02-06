// frontend/src/components/VideoPlayer.js

import React from 'react';

const VideoPlayer = ({ videoUrl, subtitles }) => {
  return (
    <div>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {subtitles && (
        <div>
          <h3>Subtitles:</h3>
          <p>{subtitles}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
