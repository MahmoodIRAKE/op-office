// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'product form',
    path: '/dashboard/product-form',
    icon: icon('ic_analytics'),
  },
  {
    title: 'products manager',
    path: '/dashboard/product-manager',
    icon: icon('ic_user'),
  },
  {
    title: 'catgory manager',
    path: '/dashboard/category-manager',
    icon: icon('ic_user'),
  },
  {
    title: 'catgory form',
    path: '/dashboard/category-form',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },

];

export default navConfig;
