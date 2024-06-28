import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material';
import { Close, DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import useApi from '../hooks/useApi'
import {API_URLS} from '../services/api.urls'

const dialogStyle = {
height: '90%',
width: '80%',
maxHeight: '100%',
maxWidth: '100%',
boxShadow: 'none',
borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)({
display: 'flex',
justifyContent: 'space-between',
padding: '10px 15px',
background: '#F2F6FC',
'& > p': {
fontSize: 14,
fontWeight: 500
}
})

const RecipientsWrapper = styled(Box)({
display: 'flex',
flexDirection: 'column',
padding: '0 15px',
'& > div': {
fontSize: 14,
borderBottom: '1px solid #F5F5F5',
marginTop: 10
}
})

const Footer = styled(Box)({
display: 'flex',
justifyContent: 'space-between',
padding: '10px 15px',
alignItems: 'center'
})

const SendButton = styled(Button)({
background: '#0B57D0',
color: '#fff',
fontWeight: 500,
textTransform: 'none',
borderRadius: 18,
width: 100
})

const ComposeMail = ({ openDialog, setOpenDialog }) => {

const [data, setData] = useState({})
const sentEmailService = useApi(API_URLS.saveSentEmail);
const savedDraftService = useApi(API_URLS.saveDraftEmails);

const closeComposeMail = async(e) => {
    e.preventDefault()

    const payload = {
        to:data.to,
        from : 'hnasreen1993@gmail.com',
        subject : data.subject,
        body : data.body,
        date: new Date(),
        image : "",
        name: 'Nasreen',
        starred : false,
        type: 'drafts',
        userID:window.localStorage.getItem("userID")
    }

    await savedDraftService.call(payload);

    if(!savedDraftService.error){
        setOpenDialog(false)
        setData({})
    } else {
        
    }


    // setOpenDialog(false)
}

const sendMail = async (e) => {
    e.preventDefault()

    const serviceId = process.env.REACT_APP_SERVICEID
    const templateId =process.env.REACT_APP_TEMPLATEID
    const publicKey = process.env.REACT_APP_PUBLICKEY


    const serviceData = {
        service_id:serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params : {
            from_name: 'Nasreen',
            from_email: 'hnasreen1993@gmail.com',
            to_name: data.to,
            subject: data.subject,
            message: data.body
        }
    }
   
    try{
        const res=await axios.post("https://api.emailjs.com/api/v1.0/email/send",serviceData)
        console.log(res)
        alert('Email Sent Successfully')
    }
    catch(error){
        console.log(error)
    }

    const payload = {
        to:data.to,
        from : 'hnasreen1993@gmail.com',
        subject : data.subject,
        body : data.body,
        date: new Date(),
        image : "",
        name: 'Nasreen',
        starred : false,
        type: 'sent',
        userID:window.localStorage.getItem("userID")
    }

    // const inboxPayload = {
    //     to: 'hnasreen1993@gmail.com', // Appears as received by the sender
    //     from: data.to, // Shows the email is from the recipient
    //     subject: data.subject,
    //     body: data.body,
    //     date: new Date(),
    //     image: "",
    //     name: 'Nasreen',
    //     starred: false,
    //     type: 'inbox', // Mark it as inbox
    //     userID: window.localStorage.getItem("userID")
    // };


    await sentEmailService.call(payload);

    // Check if there was an error saving the sent email
    // if (sentEmailService.error) {
    //     console.error(sentEmailService.error);
    // }

    // Save to "Inbox"
    // await sentEmailService.call(inboxPayload);

    // Check if there was an error saving the inbox email
    // if (sentEmailService.error) {
    //     console.error(sentEmailService.error);
    // }

    if(!sentEmailService.error){
        setOpenDialog(false)
        setData({})
    } else {
        console.error(sentEmailService.error);
    }

    setOpenDialog(false)

}

const onValueChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
}

return (
    <Dialog
        open={openDialog}
        PaperProps={{ sx: dialogStyle }}
    >
        <Header>
            <Typography>New Message</Typography>
            <Close fontSize='small' onClick={(e) => closeComposeMail(e)} />
        </Header>
        <RecipientsWrapper>
            <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChange(e)} />
            <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)} />
        </RecipientsWrapper>
        <TextField
            multiline
            rows={22}
            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
            name='body' onChange={(e) => onValueChange(e)}
        />
        <Footer>
            <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
            <DeleteOutline onClick={() => setOpenDialog(false)} />
        </Footer>
    </Dialog>
)
}

export default ComposeMail

