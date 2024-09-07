import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectPage = () => {
  const { shortUrl } = useParams();
  // const history = useHistory();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        // Make a request to your backend to get the long URL
        const response = await axios.get(`https://urlshortenerbackend-b9op.onrender.com/api/url/${shortUrl}`);
        // Redirect to the long URL
        window.location.href = response.data.longUrl;
      } catch (error) {
        console.error('Error fetching the URL:', error);
        // Handle errors or show a message
      }
    };

    fetchUrl();
  }, [shortUrl]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
