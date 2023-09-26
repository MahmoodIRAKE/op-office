import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
// @mui
import { Container, Stack, Typography,Divider } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import CategoriesServices from '../Featuers/categories/categoreis'
import ProductsServices from '../Featuers/products/products'
// mock

import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products,setProducts] = useState([]);
  const [categoreis,setCategories] = useState([]);
  const [fcategoreis,setFCategories] = useState([]);
  const [loader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    ProductsServices.getAllProducts(setShowLoader,setProducts,setError)
    CategoriesServices.getAllCategoreis(setShowLoader,setCategories,setError)
    CategoriesServices.getAllCategoreis(setShowLoader,setFCategories,setError)
},[])
useEffect(()=>{
  if(filteredCategory){
  setFCategories([...categoreis?.filter(a=>a.id===filteredCategory)])
  }else{
    setFCategories([...categoreis])
  }
},[filteredCategory])



  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products Menu </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {categoreis?
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              categories={categoreis}
              setFilteredCategory={setFilteredCategory}
            />
            :<></>}
            <ProductSort filteredCategory={categoreis?.find(a=>a.id===filteredCategory)?.name} />
          </Stack>
        </Stack>
        {fcategoreis?.map(a=>
        <div key={a.id}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {a.name}
          </Typography>
          <ProductList products={products?.filter(b=>b.categoryId===a.id)}  />
          <Divider sx={{ borderStyle: 'dashed' }} />
        </div>
        )}
   
        
        <ProductCartWidget />
      </Container>
    </>
  );
}
