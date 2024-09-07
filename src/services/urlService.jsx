import axios from 'axios';

const API_URL = 'https://urlshortenerbackend-b9op.onrender.com/api/url';

export const shortenURL = async (longUrl) => {
  const response = await axios.post(`${API_URL}/shorten`, { longUrl });
  return response.data;
};

// Additional services for fetching URL statistics
