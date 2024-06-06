
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

export default function Genres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const genresPerPage = 8; // Number of genres to display per page

    const navigate = useNavigate();

    async function getGenres(query = '') {
        setLoading(true);
        try {
            const response = await axios.get(`https://bookify-new.onrender.com/api/v1/genre?limit=64&keyword=${query}`);
            console.log('Response data:', response.data);
            setGenres(response.data.genre);
        } catch (error) {
            console.error('Error fetching genres:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getGenres();
    }, []);

    // Logic for displaying genres
    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);

    // Logic for pagination
    const totalPages = Math.ceil(genres.length / genresPerPage);
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

    const handleSearch = (e) => {
        e.preventDefault();
        getGenres(searchQuery);
    };

    return (
        <div className='container'>
            <h1 className='my-3 text-center'>All Genres</h1>
            <form className="d-flex mb-3" onSubmit={handleSearch}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search genres"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn original-button" type="submit">Search</button>
            </form>
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
                <div className='row'>
                    {currentGenres.map(genre => (
                        <div key={genre._id} className='col-md-3 mb-3'>
                            <Link to={"/Genre/" + genre._id} className='card h-100'>
                                <img src={genre.image} className='card-img-top' alt={genre.name} />
                                <div className='card-body'>
                                    <h5 className='card-title'>{genre.name}</h5>
                                    <p className='card-text'>{genre.slug}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
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
        </div>
    );
}
