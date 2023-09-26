import { Helmet } from 'react-helmet-async';
// @mui
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

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
  Box, Card
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

export default function ProductProfile() {
 
 const location = useLocation();
 const product =  location.state.product; 
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  console.log(product)
 

  return (
    <>
      <Helmet>
        <title> {product?.name} </title>
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
            <div className='productContainer'>
            
                <img src={product?.image} alt={product?.name} className='image'/>
            
             <div className='info'>
                <Typography>{product?.name}</Typography>
                <Typography>{product?.desc}</Typography>
                <Typography>Add To Cart</Typography>
                <Typography>QTY</Typography>
             </div>
             </div>
          </StyledContent>


        </Container>
      </StyledRoot>
    </>
  );
}
