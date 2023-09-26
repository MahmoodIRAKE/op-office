import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product,onClick}) {
  const { name, image, price } = product;

  const AddtoCart=()=>{
    
  }

  return (
    <Card >
      <Box sx={{ pt: '100%', position: 'relative' }}>

        <StyledProductImg alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" onClick={onClick}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          
          <Typography variant="subtitle1">
            {price} NIL
          </Typography>
            <Link color="inherit" underline="hover" onClick={onClick}>
            <Typography variant="subtitle2" noWrap>
              + Add To Cart
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
