import axios from 'axios';
import { mockContentResponse } from './mockData';

const apiBaseUrl = 'http://localhost:5003';

export const generateContent = async (prompt, tone) => {
  try {
    // Check if the backend URL is available
    if (apiBaseUrl) {
      const response = await axios.post(`${apiBaseUrl}/generate_content`, { prompt, tone });
      return response.data.generated_content;
    } else {
      // Return mock data if the backend URL is not available
      return mockContentResponse.generated_content;
    }
  } catch (error) {
    console.error('Error generating content:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};