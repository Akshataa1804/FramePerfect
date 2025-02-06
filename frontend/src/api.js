// frontend/src/api.js

import axios from 'axios';

const uploadVideo = (video) => {
  const formData = new FormData();
  formData.append('video', video);
  return axios.post('http://127.0.0.1:8000/api/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default uploadVideo;
