import { Box, Typography, Checkbox, styled } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div': {
        display: 'flex',
        width: '100%',
        '& > p': {
            fontSize: 14
        }
    }
});

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6
});

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5f6368'
});

const Email = ({ email, selectedEmails, setRefreshScreen, setSelectedEmails }) => {
    const navigate = useNavigate();
    const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
    const [isViewed, setIsViewed] = useState(false); // State to track if email is viewed

    const toggleStarredEmails = async () => {
        await toggleStarredService.call({ id: email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState);
    };

    const onValueChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    };

    const handleClick = () => {
        if (!isViewed) {
            setIsViewed(true); // Mark email as viewed
        }
        navigate(routes.view.path, { state: { email: email } });
    };

    // Apply conditional styling for bold text
    const emailStyle = {
        fontWeight: isViewed || email.read ? 'normal' : 'bold',
    };

    return (
        <Wrapper>
            <Checkbox
                size='small'
                checked={selectedEmails.includes(email._id)}
                onChange={onValueChange}
            />
            {email.starred ? (
                <Star
                    fontSize="small"
                    style={{ marginRight: 10, color: '#F3B400' }}
                    onClick={toggleStarredEmails}
                />
            ) : (
                <StarBorder
                    fontSize="small"
                    style={{ marginRight: 10 }}
                    onClick={toggleStarredEmails}
                />
            )}
            <Box onClick={handleClick} style={emailStyle}>
                <Typography style={{ width: 200, overflow: 'hidden' }}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject}{email.body && ' - '}{email.body}</Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                </Date>
            </Box>
        </Wrapper>
    );
};

export default Email;
