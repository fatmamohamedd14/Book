import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function UpdateInfo() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let [updatedInfo, setUpdatedInfo] = useState(null);
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').max(20, 'Name cannot exceed 20 characters').required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    age: Yup.number().min(1, 'Age must be at least 1').max(100, 'Age cannot exceed 100').required('Age is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: ''
    },
    validationSchema,
    onSubmit: submitForm
  });

  async function submitForm(values) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      setLoading(true);
      const response = await axios.put(
        'https://bookify-new.onrender.com/api/v1/auth/updateInfo',
        values,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.message === 'your  info updated successfully') {
        setError('');
        setUpdatedInfo(response.data.updateInfo);
        setLoading(false);
      } else {
        setError('Failed to update info. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating info:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      setError(error.response?.data?.message || 'Failed to update info. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        {error && <p className='alert alert-danger'>{error}</p>}
        <h2>Update Info</h2>



        <label htmlFor='name'>Name:</label>
        <input type='text' className='form-control mb-3' id='name' name='name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name && <p className='alert alert-danger'>{formik.errors.name}</p>}





        <label htmlFor='email'>Email:</label>
        <input type='email' className='form-control mb-3' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email && <p className='alert alert-danger'>{formik.errors.email}</p>}

        <label htmlFor='age'>Age:</label>
        <input type='number' className='form-control mb-3' id='age' name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.age && formik.touched.age && <p className='alert alert-danger'>{formik.errors.age}</p>}

        {loading ? (
          <button className='btn btn-success ms-auto d-block mt-3' disabled>
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
          </button>
        ) : (
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn form-btn ms-auto d-block'>Update</button>
        )}
      </form>

      {updatedInfo && (
        <div className="alert alert-success mt-4">
          <h4>Information Updated Successfully</h4>
          <p><strong>Email:</strong> {updatedInfo.email}</p>
          <p><strong>Age:</strong> {updatedInfo.age}</p>
          
                  <button className='btn bg-main text-white mt-2 '  onClick={() => navigate('/ProfilePage')}>OK</button>
              
        </div>
      )}
    </div>
  );
}
