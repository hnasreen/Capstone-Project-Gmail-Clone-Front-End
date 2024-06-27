import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { gmailLogo } from '../constants/constant' // Adjust the path as necessary

// Styled components using MUI's system
const RegisterContainer = styled(Box)({
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

const Register = () => {
    const navigate = useNavigate();

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        // Validation function to check if fields are empty
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Username is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
            try {
                const res = await axios.post('http://localhost:8000/register', values);
                if (res.data.success) {
                    alert(res.data.message);
                    resetForm(); // Clear the form
                    navigate('/login'); // Navigate to login page
                } else {
                    setFieldError('general', res.data.message); // Handle any custom error messages from the server
                }
            } catch (error) {
                console.log(error);
                setFieldError('general', "An error occurred during registration. Please try again."); // Display general error message
            } finally {
                setSubmitting(false); // Formik's way of managing the submission state
            }
        },
    });

    return (
        <RegisterContainer>
            <FormWrapper>
                <Logo src={gmailLogo} alt="Gmail Logo" />
                <Typography variant="h5" gutterBottom>
                    Create Your Account
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete='true'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete='true'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ margin: '20px 0' }}
                    >
                        Register
                    </Button>
                </form>
                {formik.errors.general && (
                    <Typography variant="body2" color="error">
                        {formik.errors.general}
                    </Typography>
                )}
            </FormWrapper>
        </RegisterContainer>
    );
};

export default Register;
