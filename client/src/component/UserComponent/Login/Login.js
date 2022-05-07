import * as React from 'react';
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
import {useNavigate} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import Googlelogin from "../Google/Google.js"


const theme = createTheme();

export default function SignInSide() {

  const navigate=useNavigate()

  const [emailerr,setemailerr] = React.useState(false)
  const [passworderr,setpassworderr]= React.useState(false)

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



  async function onsubmit (data){
    try{
      let res = await axios.post("/login",data)
      if(res.data === 401){
        setemailerr(true)
        navigate("/login")
      }else if(res.data === 402){
        setemailerr(false)
        setpassworderr(true)
        navigate('/login')
      }else{
        setemailerr(false)
        setpassworderr(false)
        localStorage.setItem("usertoken",res.data.token)
        localStorage.setItem("userid",res.data._id)
        navigate('/')
      }
    }catch(err){
      console.log(err)
      navigate('/login')
    }
  }


  function goolelogin(){
    navigate('/googlelogin')
  }
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
              Sign in
            </Typography>
            {passworderr && <Typography sx={{color:"red",mt:"2%"}}>Invalid Password</Typography>}
            {emailerr && <Typography sx={{color:"red",mt:"2%"}}>Invalid Email</Typography>}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type='email'
                label="Email Address"
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(onsubmit)} 
              >
                Sign In
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Button
              type='submit'
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                <Googlelogin/>
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Container>
  );
}