import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ onFileUpload, onGenerateSubtitles }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Upload");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const sidebarOptions = {
    "/subtitles": ["Generate Subtitles", "Edit Subtitles"],
    "/media": ["Add Media", "Manage Media"],
    "/audio": ["Extract Audio", "Adjust Volume"],
    "/edit": ["Trim", "Crop", "Effects"],
    "/profile": ["Account", "Settings"],
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus(null); // Reset status when a new file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", response.data);

      if (response.data?.video_url && response.data?.transcription) {
        // Pass both videoURL and transcription to the parent component
        onFileUpload(response.data.video_url, response.data.transcription);
        setUploadStatus("Upload Successful!");
      } else {
        setUploadStatus("Upload failed. No video URL or transcription received.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload Failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateSubtitles = () => {
    if (onGenerateSubtitles) {
      onGenerateSubtitles(); // Call the subtitle generation function
    }
  };

  return (
    <div className="sidebar">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="video-upload"
      />

      {/* Upload Buttons */}
      <button className="upload-btn" onClick={() => document.getElementById("video-upload").click()}>
        Select Video
      </button>

      {file && (
        <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      )}

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

      {/* Sidebar Menu */}
      <ul>
        {(sidebarOptions[location.pathname] || []).map((option) => (
          <li
            key={option}
            className={option === activeSection ? "active" : ""}
            onClick={() => {
              setActiveSection(option);
              if (option === "Generate Subtitles") {
                handleGenerateSubtitles(); // Handle subtitle generation
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;