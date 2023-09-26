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

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

// hooks

import { LoadingButton } from '@mui/lab';
import { Upload } from '../components/upload/upload';
import useResponsive from '../hooks/useResponsive';
import ProductServices from '../Featuers/products/products'
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

export default function ProductForm() {
 
  const location = useLocation();
  const productToEdit = null; 
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // location.state.user;
  const [product, setProduct] = useState({
    name: "",
    desc:'',
    image:'',
    price:0,
    categoryId:'',
    filters:'',
    rating:0,
    qty:0,
    createdAt:'',
    lastUpdated:'',
    active:false
  });
  const [categories, setCategories] = useState(null)
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSucess] = useState(false);
  const [loader, setLoader] = useState(false);


  useEffect(()=>{
   if(productToEdit){
    setProduct({...productToEdit})
   }
   CategoriesService.getAllCategoreis(setLoader,setCategories,setShowError)
  },[])

  const handleProductInput=(event)=>{
    const {name,value}=event.target
    setProduct(prevState=>({
      ...prevState,
      [name]:value
    }))
  }



  const handleClick = () => {
    const productAddResult=addProduct();
    setImageUrls([])
    if(productAddResult){
       navigate('/dashboard', { replace: true });
    }
  };

  async function addProduct() {
     if(productToEdit){
      return ProductServices.updateProduct(product,setLoader,setShowError,setShowSucess,product.id,imageUrls);
     }
     return ProductServices.addProduct(product,setLoader,setShowError,setShowSucess,imageUrls);
  }

  return (
    <>
      <Helmet>
        <title> Product Form </title>
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
              Add Product
            </Typography>

            <Divider sx={{ my: 3 }} />

            <>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Product Info  
                </Typography>
                <TextField name="name" label="Product Name" onChange={(e)=>handleProductInput(e)}  value={product.name}required/>
                <TextField type="text" name="desc" label="Product Descreption" onChange={(e)=>handleProductInput(e)} value={product.desc}  required/>
                <TextField type="number" name="price" label="Product price" onChange={(e)=>handleProductInput(e)} value={product.price} />
                <TextField type="number" name="qty" label="Product Quantity" onChange={(e)=>handleProductInput(e)} value={product.qty} />
                {categories? 
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product.categoryId}
                    label="Category"
                    name='categoryId'
                    onChange={(e)=>handleProductInput(e)}
                    >
                        {categories.map((item)=>  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
                    </Select>:<>STILL NO CATEGORIES</>}
              
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Upload
               imageUrls={imageUrls}
               setImageUrls={setImageUrls}
               setImageUpload={setImageUpload}
               imageUpload={imageUpload}
              
              />

              <Divider sx={{ my: 3 }} />

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Add Product
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
