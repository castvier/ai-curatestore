import axios from 'axios';
import { mockEducationalContentResponse } from './mockData';

const apiBaseUrl = 'http://localhost:5003';

export const generateEducationalContent = async (prompt, difficulty) => {
  try {
    // Check if the backend URL is available
    if (apiBaseUrl) {
      const response = await axios.post(`${apiBaseUrl}/generate_educational_content`, { prompt, difficulty });
      return response.data.generated_content;
    } else {
      // Return mock data if the backend URL is not available
      return mockEducationalContentResponse.generated_content;
    }
  } catch (error) {
    console.error('Error generating educational content:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};