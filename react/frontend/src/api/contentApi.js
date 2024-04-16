// contentApi.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateContent = async (prompt, tone) => {
  try {
    // The POST request now includes tone as part of the data payload
    const response = await axios.post(`${apiBaseUrl}/generate_content`, { prompt, tone });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
