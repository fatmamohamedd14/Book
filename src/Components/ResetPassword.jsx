import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function ResetPassword() {
  const [error, setError] = useState(''); // Define error state
  const [loading, setLoading] = useState(false); // Define loading state
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    forgetCode: Yup.string().required('Forgot Code is required'),
    password: Yup.string().matches(/^[A-Za-z0-9@#$%^&*!]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required('Password is required'),
    repassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      forgetCode: '',
      password: '',
      repassword: '',
    },
    validationSchema,
    onSubmit: submitForm // Define your submitForm function or replace it with the actual function
  });


  async function submitForm(values) {
    setLoading(true);
    try {
      const response = await axios.patch(`https://bookify-new.onrender.com/api/v1/auth/resetPassword`, values);
      if (response.data.message === 'your password has changed') {
        setError('');
        setLoading(false);
        navigate('/LogIn');
      } else {
        setError('Failed to reset password. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      setError(error.response?.data?.message || 'Failed to reset password2. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        {error && <p className='alert alert-danger'>{error}</p>}
        <h2>Reset Password</h2>
        <label htmlFor='email'>Email:</label>
        <input type='email' className='form-control mb-3' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email && <p className='alert alert-danger'>{formik.errors.email}</p>}
        <label htmlFor='forgetcode'>Forgot Code:</label>
        <input type='text' className='form-control mb-3' id='forgetCode' name='forgetCode' value={formik.values.forgetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.forgetCode && formik.touched.forgetCode && <p className='alert alert-danger'>{formik.errors.forgetCode}</p>}
        <label htmlFor='password'>New Password:</label>
        <input type='password' className='form-control mb-3' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password && <p className='alert alert-danger'>{formik.errors.password}</p>}
        <label htmlFor='repassword'>Confirm Password:</label>
        <input type='password' className='form-control mb-3' id='repassword' name='repassword' value={formik.values.repassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.repassword && formik.touched.repassword && <p className='alert alert-danger'>{formik.errors.repassword}</p>}
        {loading ? (
          <button className='btn btn-success ms-auto d-block mt-3' disabled>
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
          </button>
        ) : (
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn form-btn ms-auto d-block '>Confirm</button>
        )}
      </form>
    </div>
  );
}
