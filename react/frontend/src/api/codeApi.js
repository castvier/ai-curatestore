// codeApi.js
import axios from 'axios';
import { mockCodeResponse } from './mockData';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateCode = async (prompt) => {
  try {
    // Use the API base URL from the .env file
    const response = await axios.post(`${apiBaseUrl}/generate_code`, { prompt });
    return response.data.generated_code;
  } catch (error) {
    console.error('Error generating code:', error);
    // Optionally handle the error more gracefully here
    throw error;
  }
};
