// educationalContentApi.js
import axios from 'axios';
import { mockEducationalContentResponse } from './mockData';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateEducationalContent = async (prompt) => {
  try {
    // Use the API base URL from the .env file
    const response = await axios.post(`${apiBaseUrl}/generate_educational_content`, { prompt });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating educational content:', error);
    // Optionally handle the error more gracefully here
    throw error;
  }
};
