import axios from 'axios';

const apiBaseUrl = 'http://localhost:8020';

export const generateCode = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/generate_code`, { prompt });
    const { generated_code } = response.data;
    return { generated_code };
  } catch (error) {
    console.error('Error generating code:', error.response.data);
    throw error;
  }
};