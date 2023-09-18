import { Helmet } from 'react-helmet-async';
// @mui
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from '@mui/material';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

// hooks

import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
import UsersService from '../Featuers/Users/users'
// components
import db from '../api/firebase'
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import './style.css'
// sections

// components

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  //   justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function UserForm() {
  const [user, setUser] = useState({
    apartmentNumber: 0,
    city: '',
    companyId: '',
    contactName: '',
    email: '',
    phone: '',
    secondPhone: '',
    street: '',
    cost: 0,
    ordersNumber: '',
    nextDelivery: '',
    customerStatus: '',
    companyName:'',
    createdAt:'',
    lastUpdated:'',
    active:false
  });

  const handleUserInput=(event)=>{
    const {name,value}=event.target
    setUser(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSucess] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleClick = () => {
    const userAddResult=addUser();
    if(userAddResult){
       navigate('/dashboard', { replace: true });
    }
  };

  async function addUser() {
     return UsersService.addUser(user,setLoader,setShowError,setShowSucess);
  }

  return (
    <>
      <Helmet>
        <title> User Form </title>
      </Helmet>

      <StyledRoot>
        <Container>
          {loader &&
                <>
                <div style={{position:'absolute',top:'0%',height:'100vh',width:'120vh',opacity:0.13,backgroundColor:'#333'}}>
              /
              </div>
              <CircularProgress color="success"  style={{position:'absolute',top:'50%',left:'55%'}}/>
              </>
          }
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Add User
            </Typography>

            <Divider sx={{ my: 3 }} />

            <>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Company Info  
                </Typography>
                <TextField name="companyName" label="Company Name" onChange={(e)=>handleUserInput(e)} required/>
                <TextField name="companyId" label="Company Id" onChange={(e)=>handleUserInput(e)}/>
                <TextField name="contactName" label="Contact Name" onChange={(e)=>handleUserInput(e)} required/>
                <TextField type='email' name="email" label="Email" onChange={(e)=>handleUserInput(e)} required/>
                <TextField name="phone" label="Phone" onChange={(e)=>handleUserInput(e)} required/>
                <TextField name="secondPhone" label="Second Phone" onChange={(e)=>handleUserInput(e)}/>

                <Divider sx={{ my: 3 }} />
                <Typography variant="h4" gutterBottom>
                  Company Address
                </Typography>

                <TextField name="city" label="City" onChange={(e)=>handleUserInput(e)} required/>
                <TextField name="street" label="Street" onChange={(e)=>handleUserInput(e)} required/>
                <TextField type='number' name="apartmentNumber" label="Apartment Number" onChange={(e)=>handleUserInput(e)} required/>

                {/* <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </Stack>

 

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Add User
              </LoadingButton>
              {showError&&
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
              </Alert>
              }
              {showSuccess &&
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>
              }
            </>
          </StyledContent>


        </Container>
      </StyledRoot>
    </>
  );
}
