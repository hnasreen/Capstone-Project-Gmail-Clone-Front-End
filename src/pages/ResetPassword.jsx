import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { gmailLogo } from '../constants/constant' // Adjust the path as necessary

// Styled components using MUI's system
const ResetPasswordContainer = styled(Box)({
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

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://capstone-project-gmail-clone-backend.onrender.com/reset-password/${id}`, { password }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials:true
      });

      if (response.data.success) {
        alert(response.data.message);
        setPassword('');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating password.');
    }
  };

  return (
    <ResetPasswordContainer>
      <FormWrapper>
        <Logo src={gmailLogo} alt="Gmail Logo" />
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="New Password"
            type="password"
            autoComplete='true'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control rounded-0"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: '20px 0' }}
          >
            Update
          </Button>
        </form>
      </FormWrapper>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
