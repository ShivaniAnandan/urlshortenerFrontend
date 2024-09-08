import axios from 'axios';

const API_URL = 'https://urlshortenerbackend-b9op.onrender.com/api/url';

// Function to shorten a long URL
export const shortenURL = async (longUrl) => {
  const response = await axios.post(`${API_URL}/shorten`, { longUrl });
  return response.data;
};

// // Function to fetch the long URL based on the short URL
// export const fetchUrl = async (shortUrl) => {
//   const response = await axios.get(`${API_URL}/${shortUrl}`);
//   return response.data;
// };
