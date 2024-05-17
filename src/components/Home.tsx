import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home: React.FC = () => {
  const initialTab = localStorage.getItem('tab') || 'tv';
  const initialSearch = localStorage.getItem('search') || '';
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [tab, setTab] = useState(initialTab);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (search.length >= 3) {
        result = await axios(
          `https://api.themoviedb.org/3/search/${tab}?api_key=${apiKey}&query=${search}`
        );
        setData(result.data.results);
      } else {
        result = await axios(
          `https://api.themoviedb.org/3/${tab}/top_rated?api_key=${apiKey}`
        );
        setData(result.data.results.slice(0, 10));
      }
    };

    const timeoutId = setTimeout(fetchData, 100);
    return () => clearTimeout(timeoutId);
  }, [tab, search]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    localStorage.setItem('tab', newTab);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    localStorage.setItem('search', e.target.value);
  };

  return (
    <div className="home">
      <div className="tabs">
        <button onClick={() => handleTabChange('tv')}>TV Shows</button>
        <button onClick={() => handleTabChange('movie')}>Movies</button>
      </div>
      <input className='search' type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
      <div className="content">
        {data.map((item: any) => (
          <div key={item.id} className="item">
            <Link to={`/details/${item.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
              <h2>{item.title ? item.title : item.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
