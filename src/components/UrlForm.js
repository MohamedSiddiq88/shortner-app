import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../Base/Base';

const UrlForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://shortner-express-copy.vercel.app/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         url: originalUrl,
         user: localStorage.getItem('email')
         }),  
    });

    if (response.ok) {
      const data = await response.json();
      setShortenedUrl(`https://shortner-express-copy.vercel.app/${data.id}`);
      setIsCopied(false);
    } else {
      console.error('Error shortening URL');
    }

    setOriginalUrl('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setIsCopied(true);
  };

  return (
    <Base>
    <form onSubmit={handleSubmit} className='container'>
      <div className="form-group">
        <label htmlFor="originalUrl">Original URL</label>
        <input
          type="text"
          className="form-control"
          id="originalUrl"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter the original URL"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Shorten
      </button>

      {shortenedUrl && (
        <div className="mt-4">
          <h5>Shortened URL:</h5>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={shortenedUrl}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleCopy}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
    </Base>
  );
};

export default UrlForm;
