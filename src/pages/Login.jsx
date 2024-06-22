import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { gmailLogo } from '../constants/constant' // Replace with your Gmail logo path

const Login = () => {
  const navigate = useNavigate();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post('http://localhost:8000/login', values);
        // Navigate to the inbox page on successful login
        navigate('/emails/inbox');
      } catch (error) {
        // Provide a default message in case error.response is undefined
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
        setFieldError('general', errorMessage); // Set a general form error message
        console.error('Error during login:', error); // Log the full error for debugging purposes
      } finally {
        setSubmitting(false); // Formik's way of managing the submission state
      }
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ width: '350px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={gmailLogo} alt="Gmail Logo" style={{ height: '64px' }} />
            <h2 className="mt-3">Sign in</h2>
            <p>Welcome back! Sign in to continue.</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={formik.isSubmitting}
            >
              Sign in
            </button>
          </form>
          {/* Display general form error message */}
          {formik.errors.general && <p className="mt-3 text-center text-danger">{formik.errors.general}</p>}
          <div className="text-center mt-3">
            <button className="btn btn-link" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
