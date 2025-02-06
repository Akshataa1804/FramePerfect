import React from 'react';
import { Button } from '@mui/material';

const Controls = ({ onExport, onPlayPause, isPlaying }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Button variant="contained" onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button variant="contained" color="secondary" onClick={onExport}>
        Export Video
      </Button>
    </div>
  );
};

export default Controls;
