import axios from 'axios';

const apiBaseUrl = 'http://localhost:5001'; // Replace with your Flask backend URL

export const generateContent = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/generate_content`, { prompt });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};