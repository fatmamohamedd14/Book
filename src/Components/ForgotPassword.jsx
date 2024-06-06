import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitForm(values) {
    setLoading(true);
    try {
      const response = await axios.patch(`https://bookify-new.onrender.com/api/v1/auth/forgetPassword`, values);
      if (response.data.message === 'your OTP generated successfully...check your email') {
        setError('');
        setLoading(false);
        navigate('/ResetPassword');
      } else {
        setError('Failed to send code. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      setError(error.response?.data?.message || 'Failed to send code2. Please try again.');
      setLoading(false);
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: submitForm
  });

  return (
    <div className="row justify-content-center align-items-center h-100 p-4">
      <div className="col-md-6">
        <div className="card" style={{ backgroundColor: '#eee' }}>
          <div className="card-body">
            {error && <p className='alert alert-danger'>{error}</p>}
            <h2>Forgot Password</h2>
            <form onSubmit={formik.handleSubmit} className="my-4">
              <div className="mb-3">
                <label htmlFor='email'>Email:</label>
                <input type='email' className='form-control mb-3' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email && <p className='alert alert-danger'>{formik.errors.email}</p>}
              </div>
              {loading ? (
                <button className='btn btn-success ms-auto d-block mt-3' disabled>
                  <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
                </button>
              ) : (
                <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn form-btn ms-auto d-block '>Send Code</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
