import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';


export default function Srchbook() {
    const [booksArr, setBooksArr] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');

    async function getBooks() {
        setLoading(true);
        try {
            const response = await axios.get(`https://bookify-new.onrender.com/api/v1/book?keyword=${keyword}&limit=1000`);
            console.log('Response data:', response.data);
            setBooksArr(response.data.books);
            setRecommendedBooks(response.data.recommendedForYou);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooks();
    }, [keyword]);

    // Logic for displaying books and pagination
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = booksArr.slice(indexOfFirstBook, indexOfLastBook);
    const currentRecommendedBooks = recommendedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(Math.max(booksArr.length, recommendedBooks.length) / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                <>
                    <h2>Search Results</h2>
                    <div className='row justify-content-center'>
                        {currentBooks.map(book => (
                            <div key={book._id} className='col-md-3 mb-3'>
                                <div className='books p-3 cursor-pointer'>
                                    <Link to={'/books/' + book.id} className='books'>
                                        <img src={book.imgCover} className='w-75' alt={book.title} />
                                    </Link>
                                    <div className='col-md-8'>
                                        <p className='mb-0'>
                                            {book.title.split(" ").slice(0, 2).join(" ")}
                                        </p>
                                        <p className='description mb-0'>{book.description}</p>
                                        <Link to={'/books/' + book.id} className='books'>
                                            <button className="btn bg-main text-white mt-2">
                                                Read Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className='mt-5'>Books Recommended For You</h2>
                    <div className='row justify-content-center'>
                        {currentRecommendedBooks.map(book => (
                            <div key={book._id} className='col-md-3 mb-3'>
                                <div className='books p-3 cursor-pointer'>
                                    <Link to={'/books/' + book.id} className='books'>
                                        <img src={book.imgCover} className='w-75' alt={book.title} />
                                    </Link>
                                    <div className='col-md-8'>
                                        <p className='mb-0'>
                                            {book.title.split(" ").slice(0, 2).join(" ")}
                                        </p>
                                        <p className='description mb-0'>{book.description}</p>
                                        <Link to={'/books/' + book.id} className='books'>
                                            <button className="btn bg-main text-white mt-2">
                                                Read Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav>
                        <ul className='pagination justify-content-center'>
                            <li className='page-item'>
                                <button
                                    onClick={prevPage}
                                    className='page-link'
                                    disabled={currentPage === 1}
                                >
                                    &laquo; Previous
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(number => (
                                <li key={number} className='page-item'>
                                    <button
                                        onClick={() => paginate(number + 1)}
                                        className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className='page-item'>
                                <button
                                    onClick={nextPage}
                                    className='page-link'
                                    disabled={currentPage === totalPages}
                                >
                                    Next &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}
