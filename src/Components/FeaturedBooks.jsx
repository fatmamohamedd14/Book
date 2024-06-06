import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

const fetchBooks = async () => {
  const response = await axios.get('https://bookify-new.onrender.com/api/v1/book');
  return response.data.books.slice(0, 8);
};

export default function FeaturedBooks() {
  const { data: booksArr = [], isLoading, error } = useQuery('books', fetchBooks);

  // Clone books to make the slider continuous
  const booksToDisplay = [...booksArr, ...booksArr];

  return (
    <div className='container' style={{ fontFamily: 'Poetsen One' }}>
      <h1 style={{ fontFamily: 'Poetsen One' }} className='my-3 text-center'>TRENDING BOOKS</h1>
      <div className='slider'>
        <div className='slider-content'>
          {isLoading ? (
            <div className='text-center my-5'>
              <InfinitySpin
                visible={true}
                width='200'
                color='rgba(9, 116, 115, 1)'
                ariaLabel='infinity-spin-loading'
              />
            </div>
          ) : error ? (
            <p className='text-center my-5'>Error fetching books: {error.message}</p>
          ) : (
            booksToDisplay.map((book, index) => (
              <div key={index} className='slider-item'>
                <div className='books p-3 cursor-pointer'>
                  <Link to={'/books/' + book.id} className='books'>
                    <img src={book.imgCover} alt={book.title} className='book-image' />
                  </Link>
                  <div className='col-md-8'>
                    <p style={{ fontFamily: 'Poetsen One' }} className='mb-0'>{book.title.split(' ').slice(0, 2).join(' ')}</p>
                    <Link to={'/books/' + book.id} className='books'>
                      <button className='btn bg-main text-white mt-2'>Read Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
