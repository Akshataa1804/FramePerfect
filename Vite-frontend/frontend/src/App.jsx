import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoPreview from "./components/VideoPreview";
import Subtitles from "./components/Subtitles"; // Import the Subtitles component
import "./App.css";

const App = () => {
  const [videoURL, setVideoURL] = useState(""); // Stores uploaded video URL
  const [subtitles, setSubtitles] = useState([]); // Stores subtitles
  const [transcription, setTranscription] = useState(""); // Stores transcription

  // Function to handle file upload
  const handleFileUpload = (videoURL, transcription) => {
    setVideoURL(videoURL);
    setTranscription(transcription); // Store the transcription
  };

  // Function to generate subtitles
  const generateSubtitles = () => {
    // Use the transcription to generate subtitles
    const subtitles = formatSubtitles(transcription);
    setSubtitles(subtitles);
  };

  // Function to format transcription into subtitles
  const formatSubtitles = (transcription) => {
    // Split the transcription into sentences (example logic)
    const sentences = transcription.split(". "); // Split by period and space
    return sentences.map((sentence, index) => ({
      timestamp: `00:00:${index + 1}`, // Mock timestamp
      text: sentence.trim(),
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Sidebar 
          onFileUpload={handleFileUpload} 
          onGenerateSubtitles={generateSubtitles} 
        />

        <div className="content">
          {/* Video Preview and Timeline (Always Visible) */}
          <VideoPreview 
            videoURL={videoURL} 
          />

          {/* Subtitles Display Below Timeline */}
          <Subtitles 
            subtitles={subtitles} 
          />
        </div>
      </div>
    </Router>
  );
};

export default App;