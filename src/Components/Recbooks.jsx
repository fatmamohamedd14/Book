import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

export default function Recbooks() {
    const [booksArr, setBooksArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8; // Number of books to display per page

    const navigate = useNavigate();

    async function getBooks() {
        setLoading(true);
        try {
            const response = await axios.get('https://bookify-new.onrender.com/api/v1/book');
            console.log('Response data:', response.data);
            setBooksArr(response.data.recommendedForYou.slice(0, 1000));
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    // Logic for displaying books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = booksArr.slice(indexOfFirstBook, indexOfLastBook);

    // Logic for pagination
    const totalPages = Math.ceil(booksArr.length / booksPerPage);
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

    const handleOkClick = () => {
        navigate(0); // Refresh the page
    };

    return (
        <div className='container'>
            {loading ? (
                <div className='text-center my-5'>
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            ) : (
                <>
                    <h1 className='my-3 text-center'></h1>
                    <div className="row justify-content-center">
                        {currentBooks.map((book) => (
                            <div key={book._id} className="col-md-3 mb-3">
                                <div className="books p-3 cursor-pointer">
                                    <Link to={"/books/" + book._id} className="books">
                                        <img src={book.imgCover} className="w-75" alt={book.title} />
                                    </Link>
                                    <div className="col-md-8">
                                        <p style={{ fontFamily: 'Poetsen One' }} className="mb-0">
                                            {book.title.split(" ").slice(0, 2).join(" ")}
                                        </p>
                                        <p style={{ fontFamily: 'Poetsen One' }} className="mb-0">{book.slug}</p>
                                        <Link to={"/books/" + book._id} className="books">
                                            <button  style={{ fontFamily: 'Poetsen One' }}className="btn bg-main text-white mt-2">
                                                Read Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button
                                    onClick={prevPage}
                                    className="page-link"
                                    disabled={currentPage === 1}
                                >
                                    &laquo; Previous
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map((number) => (
                                <li key={number} className="page-item">
                                    <button
                                        onClick={() => paginate(number + 1)}
                                        className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    onClick={nextPage}
                                    className="page-link"
                                    disabled={currentPage === totalPages}
                                >
                                    Next &raquo;
                                </button>
                            </li>
                        </ul>
                        <div className="text-center mt-3">
                            {/* <button className='btn bg-main text-white' onClick={handleOkClick}>OK</button> */}
                        </div>
                    </nav>
                </>
            )}
        </div>
    );
}
