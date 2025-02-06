import React, { useState } from 'react';
import VideoUpload from './components/VideoUpload';
import axios from 'axios';

const App = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState(null);
  const [subtitles, setSubtitles] = useState('');
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (file) => {
    console.log('Selected video file:', file);

    setUploadProgress(0);
    setError(null);
    setIsUploading(true);
    setVideoURL(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('video', file);

    axios.post('http://127.0.0.1:8000/api/upload/', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    })
    .then((response) => {
      setIsUploading(false);
      setSubtitles(response.data.transcription);
      alert('Video uploaded and transcribed successfully!');
    })
    .catch((error) => {
      setIsUploading(false);
      console.error('Upload error:', error);
      setError(error.response ? error.response.data : error.message);
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Video Upload & Subtitle Generator</h2>

      <VideoUpload 
        onFileUpload={handleFileUpload} 
        uploadProgress={uploadProgress} 
        isUploading={isUploading} 
        error={error} 
      />

      {error && (
        <div style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>
          <p>Error: {error}</p>
        </div>
      )}

      {videoURL && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Video:</h3>
          <video width="100%" controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {subtitles && (
            <div style={{ marginTop: '20px' }}>
              <h3>Generated Subtitles:</h3>
              <p style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
                {subtitles}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;