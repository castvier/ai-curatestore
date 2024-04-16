import axios from 'axios';
import { mockCodeResponse } from './mockData';

const apiBaseUrl = 'http://localhost:5003';

export const generateCode = async (prompt) => {
  try {
    // Check if the backend URL is available
    if (apiBaseUrl) {
      const response = await axios.post(`${apiBaseUrl}/generate_code`, { prompt });
      return response.data.generated_code;
    } else {
      // Return mock data if the backend URL is not available
      return mockCodeResponse.generated_code;
    }
  } catch (error) {
    console.error('Error generating code:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};