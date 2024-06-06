import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

export default function Srchgenre() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');

  async function getGenres() {
    setLoading(true);
    try {
      const response = await axios.get(`https://bookify-new.onrender.com/api/v1/genre?keyword=${keyword}`);
      console.log('Response data:', response.data);
      setGenres(response.data.genre);
    } catch (error) {
      console.error('Error fetching genres:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (keyword) {
      getGenres();
    }
  }, [keyword]);

  return (
    <div className='container'>
      <h1 className='my-3 text-center'>Search Results for "{keyword}"</h1>
      {loading ? (
        <div className='text-center my-5'>
          <InfinitySpin
            visible={true}
            width='200'
            color='#4fa94d'
            ariaLabel='infinity-spin-loading'
          />
        </div>
      ) : (
        <div className='row'>
          {genres.map((genre) => (
            <div key={genre._id} className='col-md-4 mb-4'>
              <div className='card'>
                <img src={genre.image} className='card-img-top' alt={genre.name} />
                <div className='card-body'>
                  <h5 className='card-title'>{genre.name}</h5>
                  <p className='card-text'>{genre.slug}</p>
                  <Link to={'/genres/' + genre.slug} className='btn btn-primary'>View Books</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
