import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';

export default function FeaturedBooks() {
  const [booksArr, setBooksArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12; // Number of books to display per page

  async function getBooks() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bookify-new.onrender.com/api/v1/book?limit=4000"
      );
      console.log("Response data:", response.data);
      // Slice the array to get books from index 8 to 23
      setBooksArr(response.data.books.slice(8, 4000));
    } catch (error) {
      console.error("Error fetching books:", error);
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

  return (
    <div className="container">
      <h1  style={{ fontFamily: 'Agbalumo' }} className="my-3 text-center">POPULAR CLASSICS</h1>

      <div className="row justify-content-center">
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
          currentBooks.map((books) => (
            <div key={books.id} className="col-md-3 mb-3">
              <div className="books p-3 cursor-pointer">
                <Link to={"/books/" + books.id} className="books">
                  <img src={books.imgCover} className="w-75" alt="" />
                </Link>
                <div className="col-md-8">
                  <p style={{ fontFamily: 'Poetsen One' }}  className="mb-0">
                    {books.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="mb-0">{books.slug}</p>
                  <Link to={"/books/" + books.id} className="books">
                    <button   style={{ fontFamily: 'Poetsen One' }} className="btn bg-main text-white mt-2">
                      Read Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
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
      </nav>
    </div>
  );
}
