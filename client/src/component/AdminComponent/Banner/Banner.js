import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate()

  const [baseImage, setBaseImage] = useState("");

  const [image, setimage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
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
    title:Yup.string().required("Enter the title"),
    subtitle:Yup.string().required("Enter the subtitle"),
    image:Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  })



 async function onsubmit(data){
    try{
      const newbanner={
        title:data.title,
        subtitle:data.subtitle,
        image:baseImage
      }
     let datas =  await axios.post("/admin/newbanner",newbanner)
     if(datas.status === 200){
      navigate('/admin/viewbanner')
     }
    }catch(error){
      console.log(error)
    }
  }

  function viewbanner(){
    navigate('/admin/viewbanner')
  }

  return (
    <Grid container>
      <Grid item xs={12}>
      <Button
            variant="contained"
            sx={{ ml: "90%" }}
            onClick={viewbanner}
          >
            View Banners
          </Button>
        <Box
          sx={{
            width: "50%",
            height: 500,
            boxShadow: "5px 5px 5px 5px black",
            ml: "30%",
          }}
        >
          <Typography
            align="center"
            sx={{ pt: 5, fontSize: "2rem", fontWeight: 600 }}
          >
            Banner Managment
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "90%" }}
            onClick={handleSubmit(onsubmit)}
          >
            Submit
          </Button>
          <hr />
          <br />
          <Typography
            component="span"
            sx={{ fontSize: "1.2rem", fontWeight: 500, ml: "5%" }}
          >
            Enter the title{" "}
          </Typography>
          <TextField
            component="span"
            id="standard-basic"
            variant="standard"
            sx={{ ml: "8%", mt: -2 }}
            {...register("title")}
            error={errors.title ? true : false}
            helperText={errors.title?.message}
          />
          <br />
          <br />
          <Typography
            component="span"
            sx={{ fontSize: "1.2rem", fontWeight: 500, ml: "5%" }}
          >
            Enter the sub title{" "}
          </Typography>
          <TextField
            component="span"
            id="standard-basic"
            variant="standard"
            sx={{ ml: "4%", mt: -2 }}
            {...register("subtitle")}
            error={errors.subtitle ? true : false}
            helperText={errors.subtitle?.message}
          />
          <br />
          <br />
          <br />
          <Box sx={{ ml: 6 }}>
            <input
              type="file"
              {...register('image')}
              error={errors.image ? true : false}
              helperText={errors.image?.message}
              onChange={(e)=>{
                uploadImage(e);
              }}
            />
            <img src={image} height="200" width="350" alt="Banner image" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Banner;
