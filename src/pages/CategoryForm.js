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
} from '@mui/material';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

// hooks

import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
import CategoriesService from '../Featuers/categories/categoreis'
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

export default function CategoryForm() {
 
  const location = useLocation();
  const categoryToEdit = location?.state?.category;
  const [category, setCategory] = useState({
    name: "",
    desc:'',
    createdAt:'',
    lastUpdated:'',
    active:false
  });

  useEffect(()=>{
    console.log(categoryToEdit)
   if(categoryToEdit){
    setCategory({...categoryToEdit})
   }
  },[])

  const handleCategoryInput=(event)=>{
    const {name,value}=event.target
    setCategory(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSucess] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleClick = () => {
    const categoryAddResult=addCategory();
    if(categoryAddResult){
       navigate('/dashboard', { replace: true });
    }
  };

  async function addCategory() {
     if(categoryToEdit){
      return CategoriesService.updateCategories(category,setLoader,setShowError,setShowSucess,category.id);
     }
     return CategoriesService.addCategory(category,setLoader,setShowError,setShowSucess);
  }

  return (
    <>
      <Helmet>
        <title> Category Form </title>
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
              Add Category
            </Typography>

            <Divider sx={{ my: 3 }} />

            <>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Category Info  
                </Typography>
                <TextField name="name" label="Category Name" onChange={(e)=>handleCategoryInput(e)}  value={category.name}required/>
                <TextField type="text" name="desc" label="Category Descreption" onChange={(e)=>handleCategoryInput(e)} value={category.desc}  required/>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Add Category
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
