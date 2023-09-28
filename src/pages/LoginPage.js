import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {  useDispatch } from 'react-redux'
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { setPassword } from '../Featuers/orderslice';

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
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [user,setUser]=useState('')
  const[password,setP]=useState('')
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch()
  
  const navigate = useNavigate();

  const handleClickNewUser=()=>{
    navigate('/dashboard/category-form', { replace: true ,state:{user:null}});
  }


  const saveT=()=>{
    if(user && password ){
       dispatch(setPassword({user,password}))
       if(user==='TemeAdmin'&& password==='teme123mars'){
       navigate('/dashboard', { replace: true ,state:{user:null}});
       }
    }
  }

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Optimal Office
            </Typography>



            <Divider sx={{ my: 3 }} />
              
           

            <LoginForm setP={setP} setU={setUser} save={saveT} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
