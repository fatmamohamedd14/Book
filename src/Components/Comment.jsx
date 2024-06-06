// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// export default function Comment() {
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [submittedReview, setSubmittedReview] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { id } = useParams(); // Get id from URL

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         return;
//       }

//       const response = await axios.post(
//         `https://bookify-new.onrender.com/api/v1/review`,
//         {
//           text: reviewText,
//           book: id,
//           rate: rating,
//         },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setSubmittedReview(response.data.review);
//       setErrorMessage(''); // Clear error message if review is successfully submitted
//     } catch (error) {
//       console.error('Error adding review:', error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else {
//         setErrorMessage('An unexpected error occurred.');
//       }
//     }
//   };

//   return (
//     <section className="vh-100" style={{ backgroundColor: '#eee' }}>
//       <div className="container py-5" style={{ maxWidth: '1000px' }}>
//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}
//         <div className="row justify-content-center">
//           <div className="col-md-12 col-lg-10 col-xl-8">
//             <div className="card">
//               <div className="card-body">
//                 <textarea
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   className="form-control mb-3"
//                   rows="4"
//                   placeholder="Write your review..."
//                 ></textarea>
//                 <div className="d-flex align-items-center">
//                   <p className="me-3 mb-0">Rate:</p>
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <i
//                       key={star}
//                       className={`fas fa-star me-1 ${star <= rating ? 'text-warning' : 'text-muted'}`}
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => setRating(star)}
//                     ></i>
//                   ))}
//                 </div>
//                 <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Review</button>
//               </div>
//             </div>
//             {submittedReview && (
//               <div className="card mt-4">
//                 <div className="card-body">
//                   <p className="mb-2">{submittedReview.text}</p>
//                   <div className="d-flex align-items-center">
//                     <p className="me-3 mb-0">Rating:</p>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <i
//                         key={star}
//                         className={`fas fa-star me-1 ${star <= submittedReview.rate ? 'text-warning' : 'text-muted'}`}
//                       ></i>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// // import React, { useState } from 'react';
// export default function Comment() {
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [submittedReview, setSubmittedReview] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { id } = useParams(); // Get id from URL

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         return;
//       }

//       const response = await axios.post(
//         `https://bookify-new.onrender.com/api/v1/review`,
//         {
//           text: reviewText,
//           book: id,
//           rate: rating,
//         },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setSubmittedReview(response.data.review);
//       setErrorMessage(''); // Clear error message if review is successfully submitted
//     } catch (error) {
//       console.error('Error adding review:', error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else {
//         setErrorMessage('An unexpected error occurred.');
//       }
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         return;
//       }

//       await axios.delete(
//         `https://bookify-new.onrender.com/api/v1/review/${submittedReview._id}`,
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setSubmittedReview(null);
//       setErrorMessage(''); // Clear error message if review is successfully deleted
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else {
//         setErrorMessage('An unexpected error occurred.');
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         return;
//       }

//       const response = await axios.put(
//         `https://bookify-new.onrender.com/api/v1/review/${submittedReview._id}`,
//         {
//           text: reviewText,
//           rate: rating,
//         },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setSubmittedReview(response.data.review);
//       setErrorMessage(''); // Clear error message if review is successfully updated
//     } catch (error) {
//       console.error('Error updating review:', error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else {
//         setErrorMessage('An unexpected error occurred.');
//       }
//     }
//   };

//   return (
//     <section className="vh-100" style={{ backgroundColor: '#eee' }}>
//       <div className="container py-5" style={{ maxWidth: '1000px' }}>
//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}
//         <div className="row justify-content-center">
//           <div className="col-md-12 col-lg-10 col-xl-8">
//             <div className="card">
//               <div className="card-body">
//                 <textarea
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   className="form-control mb-3"
//                   rows="4"
//                   placeholder="Write your review..."
//                 ></textarea>
//                 <div className="d-flex align-items-center">
//                   <p className="me-3 mb-0">Rate:</p>
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <i
//                       key={star}
//                       className={`fas fa-star me-1 ${star <= rating ? 'text-warning' : 'text-muted'}`}
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => setRating(star)}
//                     ></i>
//                   ))}
//                 </div>
//                 <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Review</button>
//               </div>
//             </div>
//             {submittedReview && (
//               <div className="card mt-4">
//                 <div className="card-body">
//                   <p className="mb-2">{submittedReview.text}</p>
//                   <div className="d-flex align-items-center">
//                     <p className="me-3 mb-0">Rating:</p>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <i
//                         key={star}
//                         className={`fas fa-star me-1 ${star <= submittedReview.rate ? 'text-warning' : 'text-muted'}`}
//                       ></i>
//                     ))}
//                   </div>
//                   <button onClick={handleDelete} className="btn btn-danger mt-3 me-2">Delete Review</button>
//                   <button onClick={handleUpdate} className="btn btn-warning mt-3">Update Review</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Comment() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams(); // Get book id from URL
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.post(
        `https://bookify-new.onrender.com/api/v1/review`,
        {
          text: reviewText,
          book: id,
          rate: rating,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setSubmittedReviews([...submittedReviews, response.data.review]);
      localStorage.setItem("reviewId", response.data.review._id); // Store review ID in local storage
      setReviewText('');
      setRating(0);
      setErrorMessage(''); // Clear error message if review is successfully submitted
      navigate(`/books/${id}`); // Navigate back to the Book page
    } catch (error) {
      console.error('Error adding review:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5" style={{ maxWidth: '1000px' }}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="card">
              <div className="card-body">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Write your review..."
                ></textarea>
                <div className="d-flex align-items-center">
                  <p className="me-3 mb-0">Rate:</p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star me-1 ${star <= rating ? 'text-warning' : 'text-muted'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
                <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
