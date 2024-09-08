import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shortenURL } from '../services/urlService';

const Dashboard = () => {
  const [longUrl, setLongUrl] = useState('');
  const [description, setDescription] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Add this state
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

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
    if (submittedData && submittedData.shortUrl) {
      const redirectUrl = `https://urlshortenerbackend-b9op.onrender.com/api/url/${submittedData.shortUrl}`;
      window.location.href = redirectUrl;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!isAuthenticated) return null; // Prevent rendering if not authenticated

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
