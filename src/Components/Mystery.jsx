
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
export default function Mystery() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getBooksForGenre() {
        const genreId = localStorage.getItem('genreId');
        if (!genreId) {
            setErrorMessage('Genre ID not found in local storage.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`https://bookify-new.onrender.com/api/v1/genre/6632428320391a90e3799e7a/book`);
            console.log('Response data:', response.data);
            setBooks(response.data.books);
        } catch (error) {
            console.error('Error fetching books for genre:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooksForGenre();
    }, []);

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="row">
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
                        books.map(book => (
                            <div key={book.id} className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img
                                            src={book.imgCover}
                                            alt={book.title}
                                            className="w-100 mb-3"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <h5 className="card-title">{truncateText(book.title, 20)}</h5>
                                        <p className="card-text">{truncateText(book.description, 100)}</p>
                                        <a 
                                            href={book.bookContent} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="card-body d-flex align-items-center justify-content-center"
                                        >
                                            <i className="fa-solid fa-globe mr-4 rating-color" ></i> Visit website
                                        </a>
                                        <div className='product-box d-flex justify-content-between align-items-center mt-auto'>
                                            <span>{book.rateCount} <i className='fa-solid fa-star rating-color'></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
