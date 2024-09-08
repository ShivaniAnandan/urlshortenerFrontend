import React, { useState } from 'react';
import { shortenURL } from '../services/urlService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Dashboard = () => {
  const [longUrl, setLongUrl] = useState('');
  const [description, setDescription] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortenURL(longUrl);
      setShortUrl(response.shortUrl);
      setSubmittedData({ longUrl, description, shortUrl: response.shortUrl });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = () => {
    // Redirect to the long URL
    if (submittedData && submittedData.shortUrl) {
      const redirectUrl = `https://urlshortenerbackend-b9op.onrender.com/api/url/${submittedData.shortUrl}`;
      window.location.href = redirectUrl; // Use window.location.href for external URLs
    }
  };

  const handleLogout = () => {
    // Clear data from local storage
    localStorage.clear();

    // Redirect to the login page
    navigate('/login'); // Replace '/login' with your actual login page route
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ float: 'right' }}
        >
          Logout
        </button>
      </div>
      <h1 className='text-center' style={{ color: "#16AC88" }}>URL Shortener</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-12">
          <form onSubmit={handleSubmit} className="p-3 border rounded" style={{ backgroundColor: "#CCF5D3" }}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                className="form-control border-success"
                style={{ borderColor: "#16AC88" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-control border-success"
                style={{ borderColor: "#16AC88" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ backgroundColor: "#16AC88" }}
            >
              Shorten URL
            </button>
          </form>
          {submittedData && (
            <div className="mt-3 p-3 border rounded" style={{ backgroundColor: "#CCF5D3" }}>
              <h5>Submitted Data:</h5>
              <p><strong>Long URL:</strong> {submittedData.longUrl}</p>
              <p><strong>Description:</strong> {submittedData.description}</p>
              <p><strong>Short URL:</strong> {submittedData.shortUrl}</p>
              <button
                onClick={handleRedirect}
                className="btn btn-primary"
              >
                Click To Redirect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
