import React, { useState } from "react";
import axios from "axios";

const SubtitlesEditor = ({ videoId, subtitles, onUpdate }) => {
  const [editedSubtitles, setEditedSubtitles] = useState(subtitles);

  const handleUpdate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/update-subtitles/", {
        video_id: videoId,
        transcription: editedSubtitles,
      });

      onUpdate(editedSubtitles);
    } catch (error) {
      console.error("Error updating subtitles:", error);
    }
  };

  return (
    <div className="h-40 overflow-auto border p-2 rounded">
      <textarea
        value={editedSubtitles}
        onChange={(e) => setEditedSubtitles(e.target.value)}
        className="w-full h-full p-2 border rounded"
      />
      <button onClick={handleUpdate} className="bg-green-500 text-white p-2 mt-2 rounded">
        Save Subtitles
      </button>
    </div>
  );
};

export default SubtitlesEditor;
