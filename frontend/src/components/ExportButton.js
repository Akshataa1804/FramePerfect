import React from 'react';
import { Button } from '@mui/material';

const ExportButton = ({ onExport }) => {
  return (
    <Button variant="contained" color="primary" onClick={onExport}>
      Export Edited Video
    </Button>
  );
};

export default ExportButton;
