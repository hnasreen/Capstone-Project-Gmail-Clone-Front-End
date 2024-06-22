import { Box,Typography,styled,Divider} from "@mui/material"

const Component = styled(Box)({
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop: 50,
    opcatiy:'.8',
    width:'100%'
})

const StyledDivide = styled (Divider)({
    width:'100%',
    marginTop:10
})

const NoMails = ({message}) => {
  return (
    <Component>
        <Typography>{message?.heading}</Typography>
        <Typography>{message?.subHeading}</Typography>
        <StyledDivide/>
    </Component>
  )
}

export default NoMails

