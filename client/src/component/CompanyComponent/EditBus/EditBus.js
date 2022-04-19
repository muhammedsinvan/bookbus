import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

export default function AddressForm() {


  const [data,setdata]=useState([])
  console.log(data)


  const params=useParams()
  
  React.useEffect(()=>{
      axios.get(`/company/editbus/${params.id}`)
      .then((res)=>{
        setdata(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
  },[])


  const navigate = useNavigate()

  let companyid = localStorage.getItem('companyid')
  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");
  const [baseImage4, setBaseImage4] = useState("");

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage1(base64);
  };

  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage2(base64);
  };

  const uploadImage3 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage3(base64);
  };

  const uploadImage4 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage4(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };



        const validationSchema = Yup.object().shape({
          busname: Yup.string().required('Bus Name is required'),
          regno: Yup.string()
            .required('Req No is required')   
            .min(8, 'Reg no must be at least 8 characters')
            .max(10, 'Reg no must not exceed 10 characters'),
            bustype: Yup.string()
            .required('Select any bus type'),
            busseat: Yup.string()
            .required('Select any bus seat'),
            from: Yup.string()
            .required('Enter the from place'),
            to: Yup.string()
            .required('Enter the to place'),
            startingdate: Yup.string()
            .required('Select the starting date'),
            startingtime: Yup.string()
            .required('Select the starting time'),
            endingdate: Yup.string()
            .required('Select the Reaching date'), 
            endingtime: Yup.string()
            .required('Select the reaching time'),
            duration: Yup.string()
            .required('Duration is required'),
            price: Yup.number()
            .required('Duration is required'),
            image1: Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),

            image2: Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
            image3:  Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
            image4:  Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
        });

         const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(validationSchema)
        });


  return (


      <Container sx={{marginTop:'10%',backgroundColor:'white',borderRadius:5,boxShadow:10}}>

    <React.Fragment  >
      <Typography variant="h6" gutterBottom>
        Edit Bus
      </Typography>

      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Bus Name"
            fullWidth
            variant="standard"
            {...register('busname')}
            error={errors.busname ? true : false}
            helperText={errors.busname?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Reg No"
            fullWidth
            variant="standard"
            {...register('regno')}
            error={errors.regno ? true : false}
            helperText={errors.regno?.message}
          />
        </Grid>

<div>
        <FormControl variant="standard" sx={{ ml: 3,mt:3, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label" >Bus Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          label="BusType"
          {...register('bustype')}
          error={errors.bustype ? true : false}
          helperText={errors.bustype?.message}
        > 
          <MenuItem value={'Ac'}>Ac</MenuItem>
          <MenuItem value={'Nnonac'}>Non-Ac</MenuItem>
        </Select>
      </FormControl>


      <FormControl variant="standard" sx={{ ml: 45,mt:3,minWidth:120 }}>
        <InputLabel id="demo-simple-select-standard-label" >Seat</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          label="Seats"
          {...register('busseat')}
          error={errors.busseat ? true : false}
          helperText={errors.busseat?.message}>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem value={45}>Fourty Five</MenuItem>
        </Select>
      </FormControl>
      </div>


      <Grid item xs={12} sm={6}>
          <TextField
            label="From"
            fullWidth
            variant="standard"
            {...register('from')}
            error={errors.from ? true : false}
            helperText={errors.from?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="To"
            fullWidth
            variant="standard"
            {...register('to')}
            error={errors.to ? true : false}
            helperText={errors.to?.message}
          />

        </Grid>
        <TextField
        label="Starting Date"
        type="date"
        sx={{ width: 250  , mt:3 ,ml:3}}
        InputLabelProps={{
          shrink: true,
        }}
        
        {...register('startingdate')}
        error={errors.startingdate ? true : false}
        helperText={errors.startingdate?.message}
      />
      <TextField
        label="Starting Time"
        type="time"
        sx={{ width: 250  , mt:3 ,ml:3}}
        InputLabelProps={{
          shrink: true,
        }}
        {...register('startingtime')}
        error={errors.startingtime ? true : false}
        helperText={errors.startingtime?.message}
      />


          <TextField
        label="Reaching Date"
        type="date"
        sx={{ width: 250  , mt:3 ,ml:3}}
        InputLabelProps={{
          shrink: true, }}
        {...register('endingdate')}
        error={errors.endingdate ? true : false}
        helperText={errors.endingdate?.message}
      />

<TextField
        label="Reaching Time"
        type="time"
        sx={{ width: 250  , mt:3 ,ml:3}}
        InputLabelProps={{
          shrink: true,
        }}
        {...register('endingtime')}
        error={errors.endingtime ? true : false}
        helperText={errors.endingtime?.message}
      />

<Grid item xs={12} sm={4}>
          <TextField
            required
            label="Total Duration"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}    
            type="time"
            {...register('duration')}
        error={errors.duration ? true : false}
        helperText={errors.duration?.message}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Price"
            fullWidth
            type="number"
            variant="outlined"
            {...register('price')}
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Image 1"
            fullWidth
            variant="standard"
            type="file"
            {...register('image1')}
            error={errors.image1 ? true : false}
            helperText={errors.image1?.message}
            onChange={(e)=>{
              uploadImage1(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Image 2"
            fullWidth
            variant="standard"
            type="file"
            {...register('image2')}
            error={errors.image2 ? true : false}
            helperText={errors.image2?.message}
            onChange={(e)=>{
              uploadImage2(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Image 3"
            fullWidth
            variant="standard"
            type="file"
            {...register('image3')}
            error={errors.image3 ? true : false}
            helperText={errors.image3?.message}

            onChange={(e)=>{
              uploadImage3(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Image 4"
            fullWidth
            variant="standard"
            type="file"
            {...register('image4')}
            error={errors.image4 ? true : false}
            helperText={errors.image4?.message}
            onChange={(e)=>{
              uploadImage4(e);
            }}
          />
        </Grid>
        
        <Grid item xl={2}>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(onsubmit)}
              >
                Add Bus
              </Button>
              </Grid>
      </Grid>
    </React.Fragment>
    </Container>
  );
}