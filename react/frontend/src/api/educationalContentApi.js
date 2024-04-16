// educationalContentApi.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const generateEducationalContent = async (prompt, difficulty) => {
  try {
    // Include the difficulty level in the POST request
    const response = await axios.post(`${apiBaseUrl}/generate_educational_content`, { prompt, difficulty });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating educational content:', error);
    throw error;
  }
};
