import axios from 'axios';
import { mockEducationalContentResponse } from './mockData';

const apiBaseUrl = 'http://localhost:5001';

export const generateEducationalContent = async (prompt) => {
  try {
    // Check if the backend URL is available
    if (apiBaseUrl) {
      const response = await axios.post(`${apiBaseUrl}/generate_educational_content`, { prompt });
      return response.data.generated_content;
    } else {
      // Return mock data if the backend URL is not available
      return mockEducationalContentResponse.generated_content;
    }
  } catch (error) {
    console.error('Error generating educational content:', error);
    throw error;
  }
};