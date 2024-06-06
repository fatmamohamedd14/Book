import React, { useState } from 'react';
import axios from 'axios';

const RemoveFromWishlist = () => {
    const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`https://bookify-new.onrender.com/api/v1/history/${bookId}`, {
                headers: {
                    token: token,
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Remove a Book from Wishlist</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bookId">Book ID:</label>
                <input
                    type="text"
                    id="bookId"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                />
                <button type="submit">Remove from Wishlist</button>
            </form>
            {message && <div id="responseMessage">{message}</div>}
        </div>
    );
};

export default RemoveFromWishlist;
