import React, { useState } from 'react';
import axios from 'axios';

const AddToWishlist = () => {
    const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch('https://bookify-new.onrender.com/api/v1/wishlist', {
                book: bookId
            }, {
                headers: {
                    token:token,
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
            <h1>Add a Book to Wishlist</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bookId">Book ID:</label>
                <input
                    type="text"
                    id="bookId"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                />
                <button type="submit">Add to Wishlist</button>
            </form>
            {message && <div id="responseMessage">{message}</div>}
        </div>
    );
};

export default AddToWishlist;
