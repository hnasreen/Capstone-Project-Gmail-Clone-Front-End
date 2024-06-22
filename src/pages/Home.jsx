import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { gmailLogo } from '../constants/constant' // Import the logo image

const HomeContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f1f3f4',
});

const Sidebar = styled(Box)({
  width: '250px',
  backgroundColor: '#ffffff',
  borderRight: '1px solid #ddd',
  padding: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#fff',
});

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: '#1a73e8',
  display: 'block',
  margin: '10px 0',
  fontSize: '16px',
});

const Logo = styled('img')({
  width: '150px', // Adjust the size of the logo as needed
  marginBottom: '20px',
});

const Home = () => {
  return (
    <HomeContainer>
      <Sidebar>
        <Logo src={gmailLogo} alt="Gmail Logo" />
        <List component="nav">
          <ListItem button component={LinkStyled} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button component={LinkStyled} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={LinkStyled} to="/forgot-password">
            <ListItemText primary="Forgot Password?" />
          </ListItem>
        </List>
      </Sidebar>
      <MainContent>
        <Typography variant="h4" gutterBottom>
          Welcome to Your GMail Service
        </Typography>
        <Typography variant="body1">
          This is your home page. From here, you can register, log in, or reset your password.
        </Typography>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
