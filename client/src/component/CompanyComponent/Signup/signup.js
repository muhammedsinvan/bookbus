import * as React from 'react';
import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';


const theme = createTheme();

export default function SignUp() {

 

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string() .required('Lastname is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    number: Yup.number() .required('Number is required'),
    company: Yup.string() .required('Company Name is required'),
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



async function onsubmit (data) {
      await axios
      .post("/company/signup",data)
      .then((res)=>{
        console.log(res)
        navigate('/company/login')
      })
      .catch((err)=>{
        console.log(err)
      })
  };

  
  return (
    <Container>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{paddingTop:'9%'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  {...register('firstname')}
                  error={errors.firstname ? true : false}
                  helperText={errors.firstname?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  {...register('lastname')}
                  error={errors.lastname ? true : false}
                  helperText={errors.lastname?.message}
                  />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register('email')}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  type="number"
                  {...register('number')}
                  error={errors.number ? true : false}
                  helperText={errors.number?.message}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Company Name"
                  {...register('company')}
                error={errors.company ? true : false}
                helperText={errors.company?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                />
              </Grid>
         
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/company/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Container>
  );
}
