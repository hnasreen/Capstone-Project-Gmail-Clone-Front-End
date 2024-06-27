import React, { useState } from 'react';
import { AppBar, Toolbar, Box, InputBase, styled, Button } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)({
    background: '#f5F5F5',
    boxShadow: 'none'
});

const SearchWrapper = styled(Box)({
    background: '#EAF1FB',
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        width: '100%',
        padding:'0 10px'
    }
});

const OptionsWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    '& > svg': {
        marginLeft: 20,
        cursor: 'pointer'
    }
});

const LogoutButton = styled(Button)({
    textTransform: 'none',
    color: '#757575',
    marginLeft: 10
});

const Header = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const handleAccountClick = (e) => {
        // Prevent event propagation to the parent elements (including AppBar)
        e.stopPropagation();
        setShowLogout(!showLogout);
    };

    const handleLogout = async() => {
        try {
            // Send request to the server to clear the cookie using axios
            // await axios.post('http://localhost:8000/logout', {}, {header:{"content-type":"application/json"},withCredentials:true});

            // Navigate to home page
            navigate('/'); // or navigate to '/'
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleClickOutside = () => {
        // Hide the logout button if clicked outside the AccountCircleOutlined icon
        setShowLogout(false);
    };

    return (
        <StyledAppBar position="static">
            <Toolbar onClick={handleClickOutside}>
                <MenuIcon color="action" onClick={toggleDrawer}/>
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase placeholder='Search mail'/>
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" onClick={handleAccountClick} />
                    {showLogout && (
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    )}
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
