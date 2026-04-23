import axios from 'axios';

const API_URL = "http://localhost:3000/api/sales";

export const checkout = async (payload) => {
    try {
    const response = await axios.post(`${API_URL}/checkout`, payload);
    return response.data;

    } catch (error) {
        console.error(error);
    

    if (error.response) {
        throw new Error(error.response.data.error || 'Request failed');
      }else {
        throw new Error('Request failed');
      }

    }
};

