import * as React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import loginpic from '../../../images/one.png'
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';



const theme = createTheme();

export default function CompanySignInSide() {

  const navigate=useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(8, 'Password must not exceed 8 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  async function onsubmit(data){
      await axios.post("/company/login",data)
      .then((res)=>{
        console.log(res)
        if(res.status === 200){
          localStorage.setItem("companytoken",res.data.token)
          localStorage.setItem("companyid",res.data._id)
          navigate('/company/home')
        }else{
          navigate('/login')
        }
      })
      .catch((err)=>{
        console.log(err)
      }) 
  };

  return (
    <Container>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '60vh',marginTop:'15%',marginLeft:'13%'  }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={3.5}
          sx={{
            backgroundImage: `url(${loginpic})`,
          }}
        />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Company Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="/company/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Container>
  );
}