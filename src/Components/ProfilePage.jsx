// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function ProfilePage() {
//   const { state } = useLocation();
//   const token = state?.token;
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: 'Mahmoud Fattah',
//     email: 'example@example.com',
//     age: 30,
//     userImage: null,
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/LogIn');
//     }
//   }, [navigate]);

//   const handleImageChange = (e) => {
//     setUser({ ...user, userImage: e.target.files[0] });
//   };

//   const handleUploadImage = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('image', user.userImage);
//       const token = localStorage.getItem('token');
//       const response = await axios.patch(
//         'https://bookify-new.onrender.com/api/v1/userImage',
//         formData,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       console.log('Image added successfully:', response.data);
//       setUser({ ...user, userImage: response.data.userImage.image });
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteImage = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.patch(
//         'https://bookify-new.onrender.com/api/v1/userImage/deleteImage',
//         null,
//         {
//           headers: {
//             token,
//           },
//         }
//       );
//       console.log('Image deleted successfully:', response.data);
//       setUser({ ...user, userImage: null });
//     } catch (error) {
//       console.error('Error deleting image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-lg-4">
//           <div className="profile-card mb-4">
//             <div className="profile-card-body text-center">
//               <img
//                 src={user.userImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
//                 alt="avatar"
//                 className="rounded-circle"
//                 style={{ width: '200px' }}
//               />
//               <p className="text-white mb-1">Front End Developer</p>
//               <p className="text-white mb-4">Any message</p>
//               <div className="d-flex justify-content-center mb-2"></div>
//             </div>
//           </div>

//           <div className="profile-card mb-4">
//             <div className="profile-card-body text-center">
//               <button
//                 className="btn btn-primary btn-block mb-2"
//                 style={{ width: '100%', backgroundColor: 'black', borderColor: 'white' }}
//                 onClick={() => navigate('/ChangePass')}
//               >
//                 Change Password
//               </button>
//               <button
//                 className="btn btn-primary btn-block"
//                 style={{ width: '100%', backgroundColor: 'black', borderColor: 'white' }}
//                 onClick={() => navigate('/UpdateInfo')}
//               >
//                 Update Info
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-8">
//           <div className="profile-card mb-4">
//             <div className="profile-card-body">
//               <div className="row mb-3">
//                 <div className="col-sm-3">
//                   <p className="mb-0">Full Name</p>
//                 </div>
//                 <div className="col-sm-9">
//                   <p className="text-muted">{user.name}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="profile-card mb-4">
//             <div className="profile-card-body">
//               <div className="row mb-3">
//                 <div className="col-sm-3">
//                   <p className="mb-0">Profile Image</p>
//                 </div>
//                 <div className="col-sm-9">
//                   <input type="file" onChange={handleImageChange} />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-9 offset-sm-3">
//                   <button className="btn btn-primary me-1 mb-2 w-100" onClick={handleUploadImage} disabled={loading}>
//                     {loading ? 'Uploading...' : 'Upload Image'}
//                   </button>
//                   {user.userImage && (
//                     <button className="btn btn-danger w-100" onClick={handleDeleteImage} disabled={loading}>
//                       {loading ? 'Deleting...' : 'Delete Image'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: null,
    userImage: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/LogIn');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://bookify-new.onrender.com/api/v1/auth/getInfo', {
          headers: {
            token,
          },
        });
        const { userName, userEmail, userAge } = response.data;
        setUser({
          ...user,
          name: userName,
          email: userEmail,
          age: userAge,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleImageChange = (e) => {
    setUser({ ...user, userImage: e.target.files[0] });
  };

  const handleUploadImage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', user.userImage);
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'https://bookify-new.onrender.com/api/v1/userImage',
        formData,
        {
          headers: {
            token,
          },
        }
      );
      console.log('Image added successfully:', response.data);
      setUser({ ...user, userImage: response.data.userImage.image });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'https://bookify-new.onrender.com/api/v1/userImage/deleteImage',
        null,
        {
          headers: {
            token,
          },
        }
      );
      console.log('Image deleted successfully:', response.data);
      setUser({ ...user, userImage: null });
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="profile-card mb-4">
            <div className="profile-card-body text-center">
              <img
                src={user.userImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '200px' }}
              />
              <p className="text-white mb-1">Front End Developer</p>
              <p className="text-white mb-4"></p>
              <div className="d-flex justify-content-center mb-2"></div>
            </div>
          </div>

          <div className="profile-card mb-4">
            <div className="profile-card-body text-center">
              <button
                className="btn btn-primary btn-block mb-2"
                style={{ width: '100%', backgroundColor: 'black', borderColor: 'white' }}
                onClick={() => navigate('/ChangePass')}
              >
                Change Password
              </button>
              <button
                className="btn btn-primary btn-block"
                style={{ width: '100%', backgroundColor: 'black', borderColor: 'white' }}
                onClick={() => navigate('/UpdateInfo')}
              >
                Update Info
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="profile-card mb-4">
            <div className="profile-card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h5 className="mb-0">Name :</h5>
                </div>
                <div className="col-sm-9">
                  <p className="text-white">{user.name}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h5 className="mb-0">Email :</h5>
                </div>
                <div className="col-sm-9">
                  <p className="text-white">{user.email}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h5 className="mb-0">Age :</h5>
                </div>
                <div className="col-sm-9">
                  <p className="text-white">{user.age}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card mb-4">
            <div className="profile-card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <p className="mb-0">Profile Image</p>
                </div>
                <div className="col-sm-9">
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9 offset-sm-3">
                  <button className="btn btn-primary me-1 mb-2 w-100" onClick={handleUploadImage} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Image'}
                  </button>
                  {user.userImage && (
                    <button className="btn btn-danger w-100" onClick={handleDeleteImage} disabled={loading}>
                      {loading ? 'Deleting...' : 'Delete Image'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
