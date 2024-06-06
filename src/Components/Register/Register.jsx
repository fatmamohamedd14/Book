import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  let [error, setError] = useState('');
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  // async function submitForm(values) {
  //   setLoading(true);
  //   try {
  //     let response = await axios.post(`https://bookify-new.onrender.com/api/v1/auth/signUp`, values);
  //     if (response.data.message === 'success') {
  //       setError('');
  //       localStorage.setItem('token', response.token);
  //       setLoading(false);
  //       navigate('/LogIn');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to register. Please try again.');
  //     setLoading(false);
  //   }
  // }
 
  async function submitForm(values) {
    setLoading(true);
    try {
      const response = await axios.post(`https://bookify-new.onrender.com/api/v1/auth/signUp`, values);
      if (response.data.message === 'signUp successfully' && response.data.token) {
        // Store token securely (e.g., local storage)
        localStorage.setItem('token', response.data.token);
        setError('');
        setLoading(false);
        navigate('/LogIn');
      } else {
        setError('Failed to sign up. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
      setLoading(false);
    }
  }
  

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').max(20, 'Name cannot exceed 20 characters').required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().matches(/^[A-Za-z0-9@#$%^&*!]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required('Password is required'),
    repassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirm Password is required'),
    age: Yup.number().min(1, 'Age must be at least 1').max(100, 'Age cannot exceed 100').required('Age is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',
      age: ''
    },
    validationSchema,
    onSubmit: submitForm
  });

  return (
    <div className="container">
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        {error && <p className='alert alert-danger'>{error}</p>}
        <h2>Register Form</h2>
        <label htmlFor='name'>Name:</label>
        <input type='text' className='form-control mb-3' id='name' name='name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name && <p className='alert alert-danger'>{formik.errors.name}</p>}
        <label htmlFor='email'>Email:</label>
        <input type='email' className='form-control mb-3' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email && <p className='alert alert-danger'>{formik.errors.email}</p>}
        <label htmlFor='password'>Password:</label>
        <input type='password' className='form-control mb-3' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password && <p className='alert alert-danger'>{formik.errors.password}</p>}
        <label htmlFor='repassword'>Confirm Password:</label>
        <input type='password' className='form-control mb-3' id='repassword' name='repassword' value={formik.values.repassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.repassword && formik.touched.repassword && <p className='alert alert-danger'>{formik.errors.repassword}</p>}
        <label htmlFor='age'>Age:</label>
        <input type='number' className='form-control mb-3' id='age' name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.age && formik.touched.age && <p className='alert alert-danger'>{formik.errors.age}</p>}
        {loading ? (
          <button className='btn btn-success ms-auto d-block mt-3'>
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
          </button>
        ) : (
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn form-btn ms-auto d-block '>Register</button>
        )}
      </form>
    </div>
  );
}
