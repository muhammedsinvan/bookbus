import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {

  const navigate=useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
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

async function onsubmit(datas){
  let data = await axios.post("/admin/login",datas)
  if(data.status=== 200){
    localStorage.setItem("admintoken",data.data.admintoken)
    navigate('/admin/home')
  }else{
    navigate('/admin')
  }
}


 React.useEffect(()=>{
   let admintoken = localStorage.getItem('admintoken')
   if(admintoken){
     navigate('/admin/home')
   }
 })
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{mt:30,borderRadius:4,backgroundColor:"#EEF5DB",boxShadow:8}}>
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
          <Typography component="h1" variant="h5" sx={{mt:5}}>
            ADMIN LOGIN
          </Typography>
          <Box component="form" noValidate  onSubmit={handleSubmit(onsubmit)}   sx={{ mt: 10, minHeight:400}}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register('email')}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
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
              sx={{ mt: 10, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}