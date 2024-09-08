import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shortenURL } from '../services/urlService';
import './App.css';
// import './Dashboard.css'; // Import your custom CSS file

const Dashboard = () => {
  const [longUrl, setLongUrl] = useState('');
  const [description, setDescription] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dashboard-container">
      <div className="logout-button">
        <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
      <h1 className="title">URL Shortener</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="shorten-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter long URL"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
          >
            Shorten URL
          </button>
        </form>
        {submittedData && (
          <div className="submitted-data">
            <h5>Submitted Data:</h5>
            <p><strong>Long URL:</strong> <span className="url-text">{submittedData.longUrl}</span></p>
            <p><strong>Description:</strong> {submittedData.description}</p>
            <p><strong>Short URL:</strong> <span className="url-text">{submittedData.shortUrl}</span></p>
            <p><strong>Redirect URL:</strong> 
              <a
                href={`https://urlshortenerbackend-b9op.onrender.com/api/url/${submittedData.shortUrl}`}
                className="url-link"
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // For security reasons when opening in a new tab
              >
                https://urlshortenerbackend-b9op.onrender.com/api/url/{submittedData.shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
