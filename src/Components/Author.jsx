import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import { useParams } from 'react-router-dom';
export default function Author() {
    const [author, setAuthor] = useState({}); // Set author state
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    async function getAuthor() {
        setLoading(true);
        try {
            const response = await axios.get(`https://bookify-new.onrender.com/api/v1/author/${id}`);
            console.log('Response data:', response.data);
            setAuthor(response.data.author); // Set author state
        } catch (error) {
            console.error('Error fetching author:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAuthor();
    }, []);

    return (
      <section style={{ backgroundColor: '#fff' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  {loading ? (
                    <h1 className='text-center my-2'>Loading...</h1>
                  ) : (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-100"
                      style={{ width: '100px' }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>{author.name}</h4>
                  <p className='card-text2 line-clamp-7'>{author.brief}</p>
                  <h5>He wrote :</h5>
                <ul>
                  {author.mybooks && author.mybooks.map(book => (
                    <li key={book._id}>
                      {book.title}
                    </li>
                  ))}
                </ul>
                  {/* Render book content with click behavior */}
                  {/* <a href={author.bookContent} target="_blank" rel="noopener noreferrer">
                    <p>View Book Content</p>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }