import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserForm from './pages/UserFrom';
import CategoryForm from './pages/CategoryForm';
import ProductForm from './pages/ProductForm';
import CategoriesPage from './pages/CategoryManger';
import ProductsManagerPage from './pages/ProductManager';
import ProductProfile from './pages/ProductProfile';
import CartScreen from './pages/CartScreen';
import OrdersAdminPage from './pages/OrdersAdmin';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'category-form', element: <CategoryForm /> },
        { path: 'user-form', element: <UserForm /> },
        { path: 'product-form', element: <ProductForm /> },
        { path: 'category-manager', element: <CategoriesPage/> },
        { path: 'product-manager', element: <ProductsManagerPage/> },
        { path: 'product-profile', element: <ProductProfile/> },
        { path: 'cart', element: <CartScreen/> },
        { path: 'orders-admin', element: <OrdersAdminPage/> },

      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
