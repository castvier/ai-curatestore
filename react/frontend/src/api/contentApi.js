import axios from 'axios';
import { mockContentResponse } from './mockData';

const apiBaseUrl = 'http://localhost:5001'; // Replace with your Flask backend URL

export const generateContent = async (prompt) => {
  try {
    // Check if the backend URL is available
    if (apiBaseUrl) {
      const response = await axios.post(`${apiBaseUrl}/generate_content`, { prompt });
      return response.data.generated_content;
    } else {
      // Return mock data if the backend URL is not available
      return mockContentResponse.generated_content;
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};