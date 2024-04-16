import axios from 'axios';

// If mockData.js doesn't exist or you're not using mock responses, remove this import
// import { mockCodeResponse } from './mockData';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateCode = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/generate_code`, { prompt });
    return response.data.generated_code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error; // You may want to handle the error instead of throwing it, depending on your error boundary handling strategy
  }
};
