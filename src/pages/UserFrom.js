import { Helmet } from 'react-helmet-async';
// @mui
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
// hooks
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
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

export default function UserForm() {
  const [User, setUser] = useState({
    ApartmentNumber: 0,
    City: '',
    CompanyId: '',
    ContactName: '',
    Email: '',
    Phone: '',
    SecondPhone: '',
    Street: '',
    Cost: 0,
    ordersNumber: '',
    nextDelivery: '',
    CustomerStatus: '',
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> User Form </title>
      </Helmet>

      <StyledRoot>
        <Container>
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Add User
            </Typography>

            <Divider sx={{ my: 3 }} />

            <>
              <Stack spacing={3}>
                <TextField name="email" label="Email address" />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
              </LoadingButton>
            </>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
