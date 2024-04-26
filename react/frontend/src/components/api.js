// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your Flask server URL

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};