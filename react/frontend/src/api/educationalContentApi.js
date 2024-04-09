import axios from 'axios';

const apiBaseUrl = 'http://localhost:5001';

export const generateEducationalContent = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/generate_educational_content`, { prompt });
    return response.data.generated_content;
  } catch (error) {
    console.error('Error generating educational content:', error);
    throw error;
  }
};