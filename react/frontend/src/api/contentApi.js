import axios from 'axios';

const apiBaseUrl = 'http://localhost:8020';

export const generateContent = async (prompt, tone) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/generate_content`, { prompt, tone });
    const { generated_content } = response.data;
    return { generated_content };
  } catch (error) {
    console.error('Error generating content:', error.response.data);
    throw error;
  }
};