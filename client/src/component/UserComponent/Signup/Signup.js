import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import loginpic from '../../../images/one.png'
import axios from 'axios'
import {useNavigate} from "react-router-dom"




const theme = createTheme();

export default function SignUpSide() {
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string() .required('Lastname is required'),
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
      await axios
      .post("/signup",data)
      .then((res)=>{
        console.log(res)
        navigate('/login')
      })
      .catch((err)=>{
        console.log(err)
      })
  }




  return (
    <Container>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '70vh',marginTop:'8%',marginLeft:'13%' }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={3.5}
        >
          <img height="100%" width="100%" src='./one.png'/>
          </Grid>
        
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
              Sign Up
            </Typography>

            <Box component="form" noValidate  sx={{ mt: 1 }}>
                <TextField
                margin='normal'
                required
                fullWidth
                label="First Name"
                autoFocus
                {...register('firstname')}
                error={errors.firstname ? true : false}
                helperText={errors.firstname?.message}
                />

               <TextField
                margin='normal'
                required
                fullWidth
                label="Last Name"
                {...register('lastname')}
                error={errors.lastname ? true : false}
                helperText={errors.lastname?.message}
                />
              
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
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
              />
              <Button
                onClick={handleSubmit(onsubmit)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already exist Account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >
                Sign Up With google 
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Container>
  );
}