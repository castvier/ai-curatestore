import axios from 'axios';

const apiBaseUrl = 'http://localhost:5001';

export const generateCode = async (prompt) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/generate_code`, { prompt });
    return response.data.generated_code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};