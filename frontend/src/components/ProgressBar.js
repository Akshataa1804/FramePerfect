import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ value }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <LinearProgress variant="determinate" value={value} />
    </div>
  );
};

export default ProgressBar;
