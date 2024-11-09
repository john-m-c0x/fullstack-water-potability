import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getPrediction = async (features) => {
  try {
    console.log('Sending features to backend:', features);
    
    const response = await axios.post(`${API_URL}/predict`, {
      features: features
    });
    
    console.log('Response from backend:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.detail || error.message);
  }
};
