// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { InfinitySpin } from 'react-loader-spinner';

// export default function Books() {
//   const [book, setBook] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [reviewIdToEdit, setReviewIdToEdit] = useState(null);
//   const [updatedReviewText, setUpdatedReviewText] = useState("");
//   const [currentUserId, setCurrentUserId] = useState("");
//   const [message, setMessage] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getBook();
//     getCurrentUserInfo();
//   }, [navigate]);

//   async function getBook() {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://bookify-new.onrender.com/api/v1/book/${id}`
//       );
//       setBook(response.data.book);
//     } catch (error) {
//       console.error("Error fetching book:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function getCurrentUserInfo() {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://bookify-new.onrender.com/api/v1/auth/getInfo",
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       setCurrentUserId(response.data.userId);
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   }

//   const AddToWishlist = () => {
//     console.log(id);

//     const token = localStorage.getItem("token");
//     try {
//       const response = axios.patch(
//         "https://bookify-new.onrender.com/api/v1/wishlist",
//         {
//           book: id,
//         },
//         {
//           headers: {
//             token: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(
//         error.response ? error.response.data.message : "An error occurred"
//       );
//     }
//   };

//   async function handleUpdateStatus(status) {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         return;
//       }

//       const response = await axios.patch(
//         `https://bookify-new.onrender.com/api/v1/auth/updateStatus/${id}`,
//         { status },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       console.log("Update status response:", response.data);

//       if (status === "read") {
//         navigate(`/Comment/${id}`);
//       } else if (status === "not_read") {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const [loved, setloved] = useState(false);
//   console.log(book);

//   async function handleDelete(reviewId) {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication token not found");
//       }
//       const response = await axios.delete(
//         `https://bookify-new.onrender.com/api/v1/review/${reviewId}`,
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       console.log("Review deleted:", response.data);
//       setErrorMessage("Review deleted successfully");
//       getBook();
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else if (error.message === "Authentication token not found") {
//         setErrorMessage("Authentication token not found. Please log in again.");
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleUpdate(reviewId) {
//     setLoading(true);
//     try {
//       // Get review ID from localStorage
//       const reviewId = localStorage.getItem("reviewId");
//       if (!reviewId) {
//         setErrorMessage("No review to update.");
//         return;
//       }

//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       const response = await axios.put(
//         `https://bookify-new.onrender.com/api/v1/review/${reviewId}`,
//         {
//           text: updatedReviewText,
//         },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       console.log("Review updated:", response.data);
//       setReviewIdToEdit(null);
//       setErrorMessage("Review updated successfully");
//       getBook();
//     } catch (error) {
//       console.error("Error updating review:", error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       } else if (error.message === "Authentication token not found") {
//         setErrorMessage("Authentication token not found. Please log in again.");
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <section style={{ backgroundColor: "#eee" }}>
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-4">
//             <div className="card mb-4">
//               <div className="card-body text-center">
//                 {loading ? (
//                   <div className='text-center my-5'>
//                     <InfinitySpin
//                       visible={true}
//                       width="200"
//                       color='rgba(9, 116, 115, 1)'
//                       ariaLabel="infinity-spin-loading"
//                     />
//                   </div>
//                 ) : (
//                   <img
//                     src={book.imgCover}
//                     alt={book.title}
//                     className="w-75"
//                     style={{ width: "100px" }}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-8">
//             <div className="card mb-4">
//               <div className="card-body d-flex flex-column justify-content-between p-6">
//                 <div>
//                   <div className="padded-content">
//                     <h4>Title: {book.title}</h4>
//                   </div>
//                   <div className="padded-content">
//                     <p>Description: {book.description}</p>
//                   </div>
//                   <div className="padded-content">
//                     <a href={book.bookContent} target="_blank" rel="noopener noreferrer" className="fa-solid fa-globe mr-4 rating-color">Visit Website</a>
//                   </div>
//                   <div className="padded-content">
//                     <p className="fw-bolder">Author Name: {book.author ? book.author.name : ""}</p>
//                   </div>
//                 </div>
//                 <div className="product-box d-flex justify-content-between align-items-center mt-auto">
//                   <div>
//                     <span>
//                       {book.rateCount}{" "}
//                       <i className="fa-solid fa-star rating-color"></i>
//                     </span>
//                     <button
//                       onClick={() => {
//                         AddToWishlist();
//                         setloved(true);
//                       }}
//                       className="btn-fav"
//                     >
//                       <span>
//                         <i
//                           className={`fa-solid ${loved && "fav-color"} fa-heart `}
//                         ></i>
//                       </span>
//                     </button>
//                   </div>
//                   <div className="d-flex justify-content-start">
//                     <button
//                       onClick={() => handleUpdateStatus("not_read")}
//                       className="btn bg-main2 form-control text-white me-2"
//                     >
//                       Not Read
//                     </button>
//                     <button
//                       onClick={() => handleUpdateStatus("reading")}
//                       className="btn bg-main2 form-control text-white me-2"
//                     >
//                       Reading
//                     </button>
//                     <button
//                       onClick={() => handleUpdateStatus("read")}
//                       className="btn bg-main2 form-control text-white me-2"
//                     >
//                       Read
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card p-2" style={{ backgroundColor: "#eee" }}>
//             <div className="card-body p-3">
//               {book.myReviews &&
//                 book.myReviews.map((review) => (
//                   <div
//                     key={review._id}
//                     className="review-item d-flex justify-content-between align-items-center"
//                   >
//                     <div>
//                       {reviewIdToEdit === review._id ? (
//                         <div>
//                           <textarea
//                             value={updatedReviewText}
//                             onChange={(e) =>
//                               setUpdatedReviewText(e.target.value)
//                             }
//                             className="form-control mb-3"
//                             rows="4"
//                           />
//                           <button
//                             className="btn btn-sm btn-outline-primary me-2"
//                             onClick={() => handleUpdate(review._id)}
//                           >
//                             Update
//                           </button>
//                           <button
//                             className="btn btn-sm btn-outline-secondary"
//                             onClick={() => setReviewIdToEdit(null)}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <div>
//                           <p className="review-text">{review.text}</p>
//                           <p className="review-user">- {review.user.name}</p>
//                         </div>
//                       )}
//                     </div>
//                     {currentUserId === review.user._id && (
//                       <div>
//                         <button
//                           className="btn btn-sm btn-outline-primary me-2"
//                           onClick={() => {
//                             setReviewIdToEdit(review._id);
//                             setUpdatedReviewText(review.text);
//                           }}
//                         >
//                           <i
//                             className="fas fa-pen text-primary me-2"
//                             style={{ cursor: "pointer" }}
//                           ></i>
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDelete(review._id)}
//                         >
//                           <i className="fas fa-trash-alt"></i>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               {errorMessage && (
//                 <div className="error-message text-danger">{errorMessage}</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';
export default function Books() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reviewIdToEdit, setReviewIdToEdit] = useState(null);
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBook();
  }, [navigate]); // Add navigate to the dependencies array to trigger effect when navigate changes

  async function getBook() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://bookify-new.onrender.com/api/v1/book/${id}`
      );
      setBook(response.data.book);
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  }
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const AddToWishlist = () => {
    console.log(id);

    const token = localStorage.getItem("token");
    try {
      const response = axios.patch(
        "https://bookify-new.onrender.com/api/v1/wishlist",
        {
          book: id,
        },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  async function handleUpdateStatus(status) {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.patch(
        `https://bookify-new.onrender.com/api/v1/auth/updateStatus/${id}`,
        { status },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("Update status response:", response.data);

      if (status === "read") {
        // If status is "read", navigate to Comment Page
        navigate(`/Comment/${id}`);
      } else if (status === "not_read") {
        // If status is "not_read", navigate to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  }
  const [loved, setloved] = useState(false);
  console.log(book);
  async function handleDelete(reviewId) {
    setLoading(true);
    try {
      // Get review ID from localStorage
      const reviewId = localStorage.getItem("reviewId");
      if (!reviewId) {
        setErrorMessage("No review to delete.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.delete(
        `https://bookify-new.onrender.com/api/v1/review/${reviewId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("Review deleted:", response.data);
      setErrorMessage("Review deleted successfully");
      getBook();
    } catch (error) {
      console.error("Error deleting review:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else if (error.message === "Authentication token not found") {
        setErrorMessage("Authentication token not found. Please log in again.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(reviewId) {
    setLoading(true);
    try {
      // Get review ID from localStorage
      const reviewId = localStorage.getItem("reviewId");
      if (!reviewId) {
        setErrorMessage("No review to update.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.put(
        `https://bookify-new.onrender.com/api/v1/review/${reviewId}`,
        {
          text: updatedReviewText,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("Review updated:", response.data);
      setReviewIdToEdit(null);
      setErrorMessage("Review updated successfully");
      getBook();
    } catch (error) {
      console.error("Error updating review:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else if (error.message === "Authentication token not found") {
        setErrorMessage("Authentication token not found. Please log in again.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
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
                  <img
                    src={book.imgCover}
                    alt={book.title}
                    className="w-75"
                    style={{ width: "100px" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body d-flex flex-column justify-content-between p-6">
                <div>
                   <div className="padded-content">
                <h4>Title   : {book.title}</h4>
                </div>
                 <div className="padded-content">
                 <p>Desscription    : {book.description}</p>
                 </div>
                  <div className="padded-content">
                  <a href={book.bookContent} target="_blank" rel="noopener noreferrer" className="fa-solid fa-globe mr-4 rating-color">Visit Website</a>
                  </div>
                  <div className="padded-content">
                  <p className="fw-bolder"> Author Name     :
                   
                    {book.author ? book.author.name : ""}
                  </p>
                  </div>
                </div>
                <div className="product-box d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <span>
                      {book.rateCount}{" "}
                      <i className="fa-solid fa-star rating-color"></i>
                    </span>

                    <button
                      onClick={() => {
                        AddToWishlist();
                        setloved(true);
                      }}
                      className="btn-fav"
                    >
                      <span>
                        <i
                          className={`fa-solid ${
                            loved && "fav-color"
                          } fa-heart `}
                        ></i>
                      </span>
                    </button>
                  </div>

                  <div className="d-flex justify-content-start">
                    <button
                      onClick={() => handleUpdateStatus("not_read")}
                      className="btn bg-main2 form-control text-white me-2"
                    >
                      Not Read
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("reading")}
                      className="btn bg-main2 form-control text-white me-2"
                    >
                      Reading
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("read")}
                      className="btn bg-main2 form-control text-white me-2"
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-2" style={{ backgroundColor: "#eee" }}>
            <div className="card-body p-3">
              {book.myReviews &&
                book.myReviews.map((review) => (
                  <div
                    key={review._id}
                    className="review-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {reviewIdToEdit === review._id ? (
                        <div>
                          <textarea
                            value={updatedReviewText}
                            onChange={(e) =>
                              setUpdatedReviewText(e.target.value)
                            }
                            className="form-control mb-3"
                            rows="4"
                          />
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleUpdate(review._id)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setReviewIdToEdit(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="review-text">{review.text}</p>
                          <p className="review-user">- {review.user.name}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          setReviewIdToEdit(review._id);
                          setUpdatedReviewText(review.text);
                        }}
                      >
                        <i
                          className="fas fa-pen text-primary me-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(review._id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              {errorMessage && (
                <div className="error-message text-danger">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
