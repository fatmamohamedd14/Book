// // import axios from 'axios';
// // import { useFormik } from 'formik'
// // import React, { useState } from 'react'
// // import { RotatingLines } from 'react-loader-spinner';
// // import { useNavigate } from 'react-router-dom';
// // import * as Yup from 'yup'

// // export default function LogIn({fixed}) {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Handle form submission, e.g., send data to a server or perform authentication
// //   };

// //   return (
// //     <div>
// //       <div className="container">
// //         <form className='w-75 mx-auto my-5' onSubmit={handleSubmit}>
// //           <label htmlFor='email'>email:</label>
// //           <input
// //             type='email'
// //             className='form-control mb-3'
// //             id='email'
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />

// //           <label htmlFor='password'>password:</label>
// //           <div className='input-group mb-3'>
// //             <input
// //               type={showPassword ? 'text' : 'password'}
// //               className='form-control'
// //               id='password'
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <button
// //               type='button'
// //               className='btn btn-outline-secondary'
// //               onClick={() => setShowPassword(!showPassword)}
// //             >
// //               {showPassword ? 'Hide' : 'Show'}
// //             </button>
// //           </div>

// //           <button type='submit' className='btn btn-danger float-end'>LogIn</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// //dah shakl tany bytlop kol 7haga abl ma tdos enter bs mafhowsh show 

// import axios from 'axios';
// import { useFormik } from 'formik'
// import React, { useState } from 'react'
// import { RotatingLines } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup'

// export default function Login({fixed}) {



//  function submitLogin(values)
//  {
//   console.log(values);
//  }
    
//  const SchemaValidation = Yup.object({

//    name: Yup.string().min(3, 'min length is 3 char').max(8, 'max is 8').required('name is required'),
//    email:  Yup.string().required('email is required').email('email not valid'),
//   password:  Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password not match').required('password is required'),
//   rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword not match').required('rePassword is required'),
//   phone:  Yup.string().matches(/^(002)?01[0-25][0-9]{8}$/,  'not match').max(8, 'max is 8').required('phone is required'),



//  })

   
//   let formik = useFormik({
//     initialValues:{

  
//       email:'',
//       password:'',
      
//     },
//    validationSchema:SchemaValidation,
//   onSubmit: submitLogin
 



//   })


//   return (
//     <div>
//     <div className="container">
//       <form className='w-75 mx-auto my-5'  onSubmit={formik.handleSubmit}>
        
//         <label htmlFor='email'>email:</label>
//         <input type='email'  className='form-control mb-3' id='email'  name='email' values={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
//         {formik.errors.email && formik.touched.email ?<p  className='alert alert-danger'> {formik.errors.email} </p>:''} 
//         <label htmlFor='password'>password:</label>
//         <input type='password'  className='form-control mb-3' id='password' name='password' values={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
//         {formik.errors.password && formik.touched.password ?<p  className='alert alert-danger'> {formik.errors.password} </p>:''} 
       
        
//         <button type='submit' className='btn btn-primary  float-end'> Register</button>
//       </form>
      
      
      
      
//       </div>  
      
      
      
//     </div>
//   )
// }


// import axios from 'axios'
// import { useFormik } from 'formik'
// import React, { useContext, useState } from 'react'
// import { RotatingLines } from 'react-loader-spinner'
// import { useNavigate } from 'react-router-dom'
// import * as Yup from 'yup'
// import { UserTokenContext } from '../../Context/UserTokenContext'
// export default function LogIn({fixed}) {

//   let {islogin,setLogin} = useContext(UserTokenContext)
//   let navigate = useNavigate()
 
//   let [loading, setLoading] = useState(false)
//   let [error, setError] = useState(false)

//    async function submitForm(values)
//    {
//     setLoading(true)
//     let { data } = await axios.post(http://localhost:3000/api/v1/auth/signIn, values).catch((err) => {
//       setError(err.response.data.message)
//       setLoading(false)
//     }
//     )
//     if (data.message === 'success') {
//       setError('')
//       setLoading(false)
//       localStorage.setItem('userToken',data.token)
//       setLogin(data.token)
//       navigate('/cart')
//     }
//    }







//     const validationSchema = Yup.object({
    
//       email:Yup.string().email('email not vaild').required('email is required'),
//       password:Yup.string().matches(/[A-Z][a-z0-9]{5}$/,'not valid').required('password is required'),

//     })




//     let formik = useFormik({
//       initialValues:{
       
//         email:'',
//         password:'',
       
//       },
//       validationSchema , 
//       onSubmit:submitForm
//     })

   


//   return (
//     <div className='container py-4'>
//       <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
//         <h2 className='my-3'>Login Now:</h2>
      
//         {error ? <p className='alert alert-danger'>{error}</p> : ''}
       

//         <label htmlFor="email">email:</label>
//         <input type="email" id='email' className='form-control mb-2' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>

//        {formik.errors.email && formik.touched.email? <p className='alert alert-danger'>{formik.errors.email}</p>:''}
//         <label htmlFor="password">password:</label>
//         <input type="password" id='password' className='form-control mb-2' name='password' value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur}/>

//         {formik.errors.password && formik.touched.password? <p className='alert alert-danger'>{formik.errors.password}</p>:''}
       
//         {loading ? <button className='btn btn-success ms-auto d-block mt-3' >
//         <RotatingLines
//         strokeColor="white"
//         strokeWidth="5"
//         animationDuration="0.75"
//         width="60"
//         visible={true}
// />
//         </button> :

//           <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success ms-auto d-block mt-3' type='submit'>Login</button>
          
//        }
//       </form>
//     </div>
//   )
// }import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function LogIn({ fixed }) {
  let [error, setError] = useState('');
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  // async function submitForm(values) {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('https://bookify-new.onrender.com/api/v1/auth/signIn', values);
  //     if (response.data.message === 'login Successfully' && response.data.token) {
  //       // Use navigate with state to pass the token to ProfilePage or home page 
  //       localStorage.setItem('token', response.data.token);
  //       navigate('/');
  //     } else {
  //       setError('Failed to sign in. Please try again with another email.');
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Failed to sign in. Please try again.');
  //     setLoading(false);
  //   }
  // }



  async function submitForm(values) {
    setLoading(true);
    try {
      const response = await axios.post('https://bookify-new.onrender.com/api/v1/auth/signIn', values);
      if (response.data.message === 'login Successfully' && response.data.token) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        // Check the role and navigate accordingly
        if (role === 'user') {
          navigate('/');
        } else if (role === 'admin') {
          navigate('/Dashboard');
        } else {
          setError('Invalid role. Please contact support.');
        }
      } else {
        setError('Failed to sign in. Please try again with another email.');
        setLoading(false);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to sign in. Please try again.');
      setLoading(false);
    }
  }
  
  

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().matches(/^[A-Za-z0-9@#$%^&*!]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="container py-4">
      <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className="my-3">Login Now:</h2>
        {error ? <p className="alert alert-danger">{error}</p> : ''}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control mb-2"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? <p className="alert alert-danger">{formik.errors.email}</p> : ''}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control mb-2"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ''
        )}

        {/* Forgot Password Link */}
        <Link to="/ForgotPassword" style={{ color: 'red', opacity: '0.5' }}>
          Forgot Password?
        </Link>

        {loading ? (
          <button className="btn btn-success ms-auto d-block mt-3">
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
          </button>
        ) : (
          <button disabled={!(formik.isValid && formik.dirty)} className="btn form-btn ms-auto d-block" type="submit">
            Login
          </button>
        )}
      </form>
    </div>
  );
}
