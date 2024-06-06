import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rings } from 'react-loader-spinner'; // Import the Rings spinner

export default function BookByLang() {
  const { id } = useParams(); // Retrieve the genre ID from the URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12; // Number of books to display per page
  const limit = 4000; // Limit the number of books to 1000

  async function getBooksForGenre() {
    if (!id) {
      setErrorMessage('Genre ID not found.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://bookify-new.onrender.com/api/v1/language/${id}/book?limit=${limit}`);
      console.log('Response data:', response.data);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books for language:', error);
      setErrorMessage('Error fetching books for language.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBooksForGenre();
  }, [id]);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  // Calculate the current books to display based on pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

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
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          {loading ? (
            <div className='d-flex justify-content-center my-5'>
              <Rings
                height="80"
                width="80"
                color='rgba(9, 116, 115, 1)'
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          ) : errorMessage ? (
            <h1 className='text-center my-2'>{errorMessage}</h1>
          ) : (
            currentBooks.map(book => (
              <div key={book.id} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <Link to={"/books/" + book.id} className="card-body text-center">
                    <img
                      src={book.imgCover}
                      alt={book.title}
                      className="w-100 mb-3"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <h5 className="card-title">{truncateText(book.title, 20)}</h5>
                    <p className="card-text">{truncateText(book.description, 100)}</p>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <i className="fa-solid fa-globe mr-4 rating-color"></i> Visit website
                    </div>
                    <div className='product-box d-flex justify-content-between align-items-center mt-auto'>
                      <span>{book.rateCount} <i className='fa-solid fa-star rating-color'></i></span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination Controls */}
        {!loading && !errorMessage && (
          <nav className='pagination-nav'>
            <ul className='pagination justify-content-center'>
              <li className='page-item'>
                <button onClick={prevPage} className='page-link' disabled={currentPage === 1}>
                  &laquo; Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map(number => (
                <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <button onClick={() => setCurrentPage(number + 1)} className='page-link'>
                    {number + 1}
                  </button>
                </li>
              ))}
              <li className='page-item'>
                <button onClick={nextPage} className='page-link' disabled={currentPage === totalPages}>
                  Next &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
