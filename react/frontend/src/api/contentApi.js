// contentApi.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateContent = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/generate_content`, { prompt });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating content:', error);
    // Optionally handle the error more gracefully here
    throw error;
  }
};
