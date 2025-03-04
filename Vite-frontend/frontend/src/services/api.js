import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Make sure it matches your Django API

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  return await axios.post(`${API_BASE_URL}/upload/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
