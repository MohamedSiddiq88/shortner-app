import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../Base/Base';
import '../App.css'



const Dashboard = () => {
  const navigate = useNavigate();
  const [dailyCount, setDailyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [urls, setUrls] = useState([]);



  useEffect(() => {
    checkAuthentication();
    fetchData();
  }, []);

  const checkAuthentication = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const fetchData = async () => {
    try {
      const currentUserEmail = localStorage.getItem('email');

const dailyResponse = await fetch('https://shortner-express-copy.vercel.app/url/dailyCount', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: currentUserEmail }),
});

const dailyData = await dailyResponse.json();
setDailyCount(dailyData.count);

const monthlyResponse = await fetch('https://shortner-express-copy.vercel.app/url/monthlyCount', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: currentUserEmail }),
});

const monthlyData = await monthlyResponse.json();
setMonthlyCount(monthlyData.count);


      const urlsResponse = await fetch('https://shortner-express-copy.vercel.app/url/all');
      const urlsData = await urlsResponse.json();
      setUrls(urlsData.urls.filter((ele)=> ele.user===localStorage.getItem('email') ));

      // setUrls(urlsData.urls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Base>
    <div className='dashboard'>
      <h2>Dashboard</h2>

      <div>
        <h4>Total URLs created per day: {dailyCount}</h4>
        <h4>Total URLs created within a month: {monthlyCount}</h4>
      </div>

      <hr />

      <h3>All URLs</h3>
      <div className='dashboard-table-container'>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={url.shortId}>
              <td>{index + 1}</td>
              <td>https://shortner-express-copy.vercel.app/{url.shortId}</td>
              <td>{url.redirectURL}</td>
              <td>{url.visitHistory.length}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    </Base>  
    );
};

export default Dashboard;
