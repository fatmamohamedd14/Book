import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ChangePass() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .matches(/^[A-Za-z0-9@#$%^&*!]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
      .required('Old password is required'),
    newPassword: Yup.string()
      .matches(/^[A-Za-z0-9@#$%^&*!]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
      .required('New password is required'),
    reNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
      .required('Confirm new password is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
    validationSchema,
    onSubmit: submitForm,
  });

  async function submitForm(values) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      setLoading(true);
      const response = await axios.patch(
        'https://bookify-new.onrender.com/api/v1/auth/changePassword',
        values,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.message === 'Password changed successfully') {
        setError('');
        setLoading(false);
        navigate('/LogIn');
      } else {
        setError('Failed to change password. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      setError(error.response?.data?.message || 'Failed to change password. check the old pass and Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
        {error && <p className="alert alert-danger">{error}</p>}
        <h2>Change Password</h2>

        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="oldPassword"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.oldPassword && formik.touched.oldPassword && (
          <p className="alert alert-danger">{formik.errors.oldPassword}</p>
        )}

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <p className="alert alert-danger">{formik.errors.newPassword}</p>
        )}

        <label htmlFor="reNewPassword">Confirm New Password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="reNewPassword"
          name="reNewPassword"
          value={formik.values.reNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.reNewPassword && formik.touched.reNewPassword && (
          <p className="alert alert-danger">{formik.errors.reNewPassword}</p>
        )}

        {loading ? (
          <button className="btn btn-success ms-auto d-block mt-3" disabled>
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
          </button>
        ) : (
          <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn form-btn ms-auto d-block">
            Confirm
          </button>
        )}
      </form>
    </div>
  );
}
