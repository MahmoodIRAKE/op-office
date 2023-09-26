import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  const navigate = useNavigate();

  const handleClick=(product)=>{
    navigate('/dashboard/product-profile', { replace: true ,state:{product}});
  }

  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product}  onClick={()=>handleClick(product)}/>
        </Grid>
      ))}
    </Grid>
  );
}
