import { Helmet } from 'react-helmet-async';
import React, { useState,useEffect} from 'react';


// @mui
import { Container, Stack, Typography,Divider,Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector, useDispatch } from 'react-redux'
import { DELIVERY_STATUS,ORDER_PAYMENT_STATUS,ORDER_STATUS } from '../Featuers/orderConstants';
import { CartCard } from '../components/cart/cartCard';
import CategoriesServices from '../Featuers/categories/categoreis'
import ProductsServices from '../Featuers/products/products'
import OrdersServices from '../Featuers/order/order'
import { initilaizeOrder,emptyOrder } from '../Featuers/orderslice';

import Iconify from '../components/iconify';



function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products,setProducts] = useState([]);
  const [categoreis,setCategories] = useState([]);
  const [loader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const cart=useSelector((state)=>state.cartreducer.products)
  const order=useSelector((state)=>state.cartreducer)
  const dispatch = useDispatch()

  useEffect(()=>{
    ProductsServices.getAllProducts(setShowLoader,setProducts,setError)
    CategoriesServices.getAllCategoreis(setShowLoader,setCategories,setError)
   },[])

  const CheckOut=async()=>{
    console.log('clicked')
     await dispatch(initilaizeOrder('fakeId'))
    
  }



  useEffect(()=>{
    console.log('render')
    if(order.userId){
    OrdersServices.addOrder(order,setShowLoader,setError,setSuccess)
    dispatch(emptyOrder())
    }
   },[order.userId])


  return (
    <div className="cart-screen">
        <Helmet>
        <title> Cart Screen</title>
       </Helmet>
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       <Typography variant="h4" >
          Cart
        </Typography>

        <Button variant="contained" startIcon={<Iconify icon="eva" />} onClick={()=>CheckOut()}>
            Check Out
        </Button>
        </Stack>
       
        {error&&
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
              </Alert>
              }
              {success &&
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>
              }
        {cart?.length===0?      <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>CART IS EMPTY</strong>
              </Alert>
              :<></>}

        {cart?.map(item=><CartCard product={products?.find(a=>a.id===item.productId)} key={item.productId} item={item}/>)}

        <div className="right">
        <button className="btn" onClick={()=>CheckOut()}>Checkout</button>
        </div>
        
        

    </div>
  );
}

export default CartScreen;