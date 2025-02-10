import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return <p>No video uploaded</p>;

  return (
    <div className="p-4">
      <video controls width="100%" className="border rounded">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
