
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 

export default function Action() {
    let [genre, setGenre] = useState([]);
    let [loading, setLoading] = useState(false);
    const { id } = useParams(); // Destructure id from useParams
    async function getGenre() {
      setLoading(true);
      try {
        const response = await axios.get(`https://bookify-new.onrender.com/api/v1/genre/${id}/book`);
        console.log('Response data:', response.data);
        setGenre(response.data.genre);
      } catch (error) {
        console.error('Error fetching genre:', error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getGenre();
    }, []);
  
  
    return (
      <div className='container'>
              <div className='row align-items-center'>
                  <div className='col-md-4'>
                      <h1 className='my-3'>Featured Genres</h1>
                      <div className='books p-3'>
                          {loading ? (
                              <h1 className='text-center my-2'>Loading...</h1>
                          ) : (
                              genre && <img src={genre.image} className='w-100' alt='' />
                          )}
                      </div>
                  </div>
                  <div className='col-md-8'>
                      {loading ? (
                          <h1 className='text-center my-2'>Loading...</h1>
                      ) : (
                          genre && (
                              <div>
                                  <p>{genre.name}</p>
                                  <p>{genre.slug}</p>
                              </div>
                          )
                      )}
                  </div>
              </div>
          </div>
    )
  }
