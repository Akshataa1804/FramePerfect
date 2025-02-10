import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoPreview from "./components/VideoPreview";
import Timeline from "./components/Timeline";
import "./App.css";

const App = () => {
  const [videoURL, setVideoURL] = useState(""); // Stores uploaded video URL
  const [subtitles, setSubtitles] = useState([]); // Stores subtitles
  const [videoDuration, setVideoDuration] = useState(0); // Stores video duration

  // Function to update subtitle start time when dragged
  const handleUpdateSubtitle = (index, newStart) => {
    setSubtitles((prevSubtitles) => {
      const updatedSubtitles = [...prevSubtitles];
      updatedSubtitles[index] = { ...updatedSubtitles[index], start: newStart };
      return updatedSubtitles;
    });
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Sidebar onFileUpload={setVideoURL} />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <VideoPreview videoURL={videoURL} setVideoDuration={setVideoDuration} />
                  <Timeline
                    subtitles={subtitles}
                    videoDuration={videoDuration}
                    onUpdateSubtitle={handleUpdateSubtitle}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; // ✅ Ensure default export is present
