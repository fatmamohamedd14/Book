// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Bars } from 'react-loader-spinner';
// //  import { InfinitySpin } from 'react-loader-spinner';
// export default function Authors() {
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const authorsPerPage = 8; // Number of authors to display per page

//   async function getAuthors() {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://bookify-new.onrender.com/api/v1/author?limit=120');
//       console.log('Response data:', response.data);
//       setAuthors(response.data.authors);
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAuthors();
//   }, []);

//   // Logic for displaying authors
//   const indexOfLastAuthor = currentPage * authorsPerPage;
//   const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
//   const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);
//   const [searchQuery, setSearchQuery] = useState('');
//   // Logic for pagination
//   const totalPages = Math.ceil(authors.length / authorsPerPage);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return ( 
  
//     <div className='container'>
//             <h1 className='my-3 text-center'>All Genres</h1>
//             {loading ? (
//                 <div className='text-center my-5'>
//                     <Bars
//                         visible={true}
//                         width="100"
//                         color="#4fa94d"
//                         wrapperStyle={{}}
//                         ariaLabel="bars-loading"
//                         wrapperClass=""
                      
//                     />

            
//                 </div>  
//             ) : (
//         <div className='row'>
//           {currentAuthors.map(author => (
//             <div key={author.id} className='col-md-3 mb-3'>
//               <div className='card h-100'>
//                 <Link to={"/Author/" + author.id}> {/* Ensure the path matches your route */}
//                   <img src={author.image} className='card-img-top' alt={author.name} />
//                 </Link>
//                 <div className='card-body'>
//                   <h5 className='card-title'>{author.name}</h5>
//                   <p className='card-text line-clamp-4'>{author.brief}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <nav>
//         <ul className='pagination justify-content-center'>
//           <li className='page-item'>
//             <button
//               onClick={prevPage}
//               className='page-link'
//               disabled={currentPage === 1}
//             >
//               &laquo; Previous
//             </button>
//           </li>
//           {[...Array(totalPages).keys()].map(number => (
//             <li key={number} className='page-item'>
//               <button
//                 onClick={() => paginate(number + 1)}
//                 className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
//               >
//                 {number + 1}
//               </button>
//             </li>
//           ))}
//           <li className='page-item'>
//             <button
//               onClick={nextPage}
//               className='page-link'
//               disabled={currentPage === totalPages}
//             >
//               Next &raquo;
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

export default function Genres() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const authorsPerPage = 8; // Number of authors to display per page

    const navigate = useNavigate();

    async function getAuthors(query = '') {
        setLoading(true);
        try {
            const response = await axios.get(`https://bookify-new.onrender.com/api/v1/author?limit=1000&keyword=${query}`);
            console.log('API response:', response.data); // Log the entire response
            setAuthors(response.data.authors || []); // Ensure authors is always an array
        } catch (error) {
            console.error('Error fetching authors:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAuthors();
    }, []);

    // Logic for displaying authors
    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);
    console.log('Current authors:', currentAuthors); // Log the authors to be displayed

    // Logic for pagination
    const totalPages = Math.ceil(authors.length / authorsPerPage);
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
        getAuthors(searchQuery);
    };

    return (
        <div className='container'>
            <h1 className='my-3 text-center'>All Authors </h1>
            <form onSubmit={handleSearch} className='d-flex mb-3'>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search genres"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='submit' className='btn btn-primary'>Search</button>
            </form>
            {loading ? (
                <div className='text-center my-5'>
                    <Bars
                        visible={true}
                        width="100"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                    />
                </div>
            ) : (
                <div className='row'>
                    {currentAuthors.length > 0 ? (
                        currentAuthors.map(author => (
                            <div key={author.id} className='col-md-3 mb-3'>
                                <div className='card h-100'>
                                    <Link to={`/Author/${author.id}`}>
                                        <img src={author.image} className='card-img-top' alt={author.name} />
                                    </Link>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{author.name}</h5>
                                        <p className='card-text line-clamp-4'>{author.brief}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center'>No authors found.</p>
                    )}
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
