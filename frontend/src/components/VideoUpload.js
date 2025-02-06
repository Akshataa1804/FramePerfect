import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CircularProgress, Button, Typography } from '@mui/material';

const VideoUpload = ({ onFileUpload, uploadProgress, isUploading, error }) => {
  const [fileName, setFileName] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    maxSize: 60000000, // 60MB limit
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles[0].name);
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: '#fafafa',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6" color="textSecondary">
        Drag & drop a video, or click to select (max 1 minute, 60MB)
      </Typography>

      {fileName && !isUploading && (
        <Typography variant="body2" color="textPrimary" style={{ marginTop: '10px' }}>
          Selected file: <strong>{fileName}</strong>
        </Typography>
      )}

      {isUploading && (
        <div style={{ marginTop: '10px' }}>
          <CircularProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textPrimary">
            {uploadProgress}% Uploaded
          </Typography>
        </div>
      )}

      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
          Error: {error}
        </Typography>
      )}

      {!isUploading && !fileName && (
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Select Video
        </Button>
      )}
    </div>
  );
};

export default VideoUpload;
