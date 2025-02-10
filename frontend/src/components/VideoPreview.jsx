import React from "react";

const VideoPreview = ({ videoURL }) => {
  return (
    <div className="video-container">
      <div className="video-box">
        <h2 className="video-title">Video Uploaded</h2>
        {videoURL ? (
          <video className="video-player" controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="video-placeholder">No video uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
