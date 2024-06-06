import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

export default function Test() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get('https://bookify-new.onrender.com/api/v1/wishlist', {
        headers: {
          token: token,
        }
      });
      setWishlist(response.data.wishlist);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`https://bookify-new.onrender.com/api/v1/wishlist/${bookId}`, {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
      // Refresh the wishlist after removing the book
      fetchWishlist();
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-header">Your Wishlist</h1>
      {message && <div className="wishlist-message">{message}</div>}
      {loading ? (
        <div className='text-center my-5'>
        <InfinitySpin
            visible={true}
            width="200"
            color='rgba(9, 116, 115, 1)'
            ariaLabel="infinity-spin-loading"
        />
    </div>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map(book => (
            <li key={book._id} className="wishlist-item">
              <Link to={`/book/${book._id}`} className="wishlist-link">
                <img src={book.imgCover} alt={book.title} className="wishlist-img" />
                <span className="wishlist-title">{book.title}</span>
              </Link>
              <button onClick={() => removeFromWishlist(book._id)} className="wishlist-button">Remove from Wishlist</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
