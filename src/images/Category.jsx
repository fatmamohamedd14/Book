import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import image4 from '../assets/images/4.jpg';

const Category = () => {
  // Define an array of objects containing image paths and corresponding page paths
  const genres = [
    { image: image1, path: '/Romance' }, // Define path for the first image
    { image: image2, path: '/Advanture' }, // Define path for the second image
    { image: image3, path: '/Mystery' }, // Define path for the third image
    { image: image4, path: '/History' }, // Define path for the fourth image
  ];
 
  return (
    <div className="container">
      <div className="block-header text-center">
        <h2 style={{ fontFamily: 'Poetsen One' }} className="block-title">BROWSER GENRES</h2>
        <Link to="/AllGenre">(view all)</Link>
      </div>
      <div className="row justify-content-center">
        {/* Map over the genres array to generate genre components */}
        {genres.map((genre, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 p-2">
            <div className="photos">
              <Link to={genre.path}>
                <img loading="lazy" src={genre.image} width="250" alt="" className="img-responsive" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
