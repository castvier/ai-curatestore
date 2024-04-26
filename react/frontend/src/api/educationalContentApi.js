import axios from 'axios';

const apiBaseUrl = 'http://localhost:8020';

export const generateEducationalContent = async (prompt, difficulty, subject, format) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/generate_educational_content`, { prompt, difficulty, subject, format });
    const { generated_educational_content } = response.data;
    return { generated_educational_content };
  } catch (error) {
    console.error('Error generating educational content:', error.response.data);
    throw error;
  }
};