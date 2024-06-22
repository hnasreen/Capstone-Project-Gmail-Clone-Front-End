import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { gmailLogo } from '../constants/constant' // Adjust the path as necessary

// Styled components using MUI's system
const ForgotPasswordContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f1f3f4',
});

const FormWrapper = styled(Box)({
  width: '400px',
  padding: '40px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const Logo = styled('img')({
  width: '120px',
  marginBottom: '20px',
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://capstone-project-gmail-clone-backend.onrender.com/forgot-password', values);
        if (response.data.success) {
          alert(response.data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        alert('Error sending reset password email.');
      }
    },
  });

  return (
    <ForgotPasswordContainer>
      <FormWrapper>
        <Logo src={gmailLogo} alt="Gmail Logo" />
        <Typography variant="h5" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
            style={{ margin: '20px 0' }}
          >
            Send
          </Button>
        </form>
      </FormWrapper>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;
