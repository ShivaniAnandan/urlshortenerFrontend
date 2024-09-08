import axios from 'axios';

const API_URL = 'https://urlshortenerbackend-b9op.onrender.com/api/url';

// Function to shorten a long URL
export const shortenURL = async (longUrl) => {
  const response = await axios.post(`${API_URL}/shorten`, { longUrl });
  return response.data;
};


