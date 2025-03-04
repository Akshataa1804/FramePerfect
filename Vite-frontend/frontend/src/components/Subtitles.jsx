import React from "react";

const Subtitles = ({ subtitles, currentTime }) => {
  const activeSubtitle = subtitles.find(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  );

  return (
    <div className="subtitles">
      {activeSubtitle ? activeSubtitle.text : ""}
    </div>
  );
};

export default Subtitles;
