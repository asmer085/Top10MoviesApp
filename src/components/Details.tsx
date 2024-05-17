import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/Details.css';

type MovieDetails = {
  poster_path: string;
  title: string;
  name: string;
  overview: string;
};

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tab = localStorage.getItem('tab');
  const [data, setData] = useState<MovieDetails | null>(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/${tab}/${id}?api_key=${apiKey}`
      );
      setData(result.data);
    };

    fetchData();
  }, [id, tab]);

  return (
    <div className="details">
      <Link to="/" className="back-button">Back</Link>
      <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      <h2>{data?.title ? data?.title : data?.name}</h2>
      <p>{data?.overview}</p>
    </div>
  );
};

export default Details;
