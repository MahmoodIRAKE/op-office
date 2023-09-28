import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import LoginPage from './pages/LoginPage';

// ----------------------------------------------------------------------


export default function App() {
  const user=useSelector((state)=>state.cartreducer.user)
  const password=useSelector((state)=>state.cartreducer.password)





  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          {user==='TemeAdmin'&& password==='teme123mars'?
          <>
       
           <ScrollToTop />
          <StyledChart />
          <Router />
          </>
          : 
          <LoginPage/>}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
