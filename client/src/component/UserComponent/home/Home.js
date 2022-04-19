import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import "./home.css";
import { Grid } from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ViewBus from "../../UserComponent/ViewBus/ViewBus";
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios";


const Home = () => {

  const validationSchema = Yup.object().shape({
    from: Yup.string().required("Please enter the field"),
    to: Yup.string().required("Please enter the field"),
    date: Yup.string().required("Please enter the field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [click, setClick] = useState(false);
  const [data, setData] = useState("");
  const [banner,setbanner] = useState([])

  function onsubmit(data) {
    setData(data);
    setClick(true);
  }

  useEffect(()=>{
    (async()=>{
      try{
let getbanner = await axios.get('/getbannerall')
setbanner(getbanner.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  return click ? (
    <ViewBus searchdata={data} />
  ) : (
    <Grid>
      <Container
        sx={{ minHeight: 300, backgroundColor: "#15325C" }}
        maxWidth="xxl"
      >
        <Grid item xs={12}>
          <Container
            sx={{
              backgroundColor: "#ffff",
              minHeight: "15%",
              position: "absolute",
              left: "50%",
              top: "23%",
              transform: "translate(-50%, -50%)",
              borderRadius: 5,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ mt: "4%", ml: "16%" }}
              style={{
                width: "750px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="outlined-basic"
                label="From"
                variant="outlined"
                {...register("from")}
                error={errors.from ? true : false}
                helperText={errors.from?.message}
              />

              <TextField
                id="outlined-basic"
                label="To"
                variant="outlined"
                {...register("to")}
                error={errors.to ? true : false}
                helperText={errors.to?.message}
              />
              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                type="date"
                {...register("date")}
                error={errors.date ? true : false}
                helperText={errors.date?.message}
              />
            </Grid>
          </Container>
          <Button
            variant="contained"
            sx={{ ml: "45%", mt: "10.8%", height: 45, width: 180, borderRadius: 8 }}
            onClick={handleSubmit(onsubmit)}
          >
            Seatch
          </Button>
        </Grid>
      </Container>
      <br/>
      <Carousel>
        {banner.map((res)=>(

  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src={res.image}
      alt="First slide"
      height="400px"
    />
    <Carousel.Caption>
      <Typography sx={{fontSize:'4rem',fontWeight:800}}>{res.title}</Typography>
      <Typography sx={{fontSize:"2rem",fontWeight:700}}>{res.subtitle}</Typography>

    </Carousel.Caption>
  </Carousel.Item>

        ))}
  </Carousel>

      <Typography
        align="center"
        sx={{ fontWeight: 600, fontSize: "1.5rem", mt: '3%' }}
      >
        Why Book My Bus For Bus Booking?
      </Typography>
      <Box sx={{ width: "100%", display: "flex", m: "2%" }}>
        <Box
          sx={{
            width: "20%",
            minHeight: 400,
            backgroundColor: "#ffff",
            border: 1.5,
            ml: "6%",
          }}
        >
          <Typography sx={{ pl: "33%", pt: "5%" }}>
            <img src="../../safety.svg" alt="logo" height={130} />
          </Typography>
          <Typography align="center" sx={{ pt: 5, fontWeight: 650 }}>
            SAFETY +
          </Typography>
          <Typography align="center" width={260} sx={{ pt: 3, pl: 13 }}>
            With Safety+ we have brought in a set of measures like Sanitized
            buses, mandatory masks etc. to ensure you travel safely in India.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "20%",
            minHeight: 400,
            backgroundColor: "#ffff",
            border: 1.5,
            ml:'2%'
          }}
        >
          <Typography sx={{ pl: "27%", pt: "5%" }}>
            <img src="../../customer.png" alt="logo" height={130} />
          </Typography>
          <Typography align="center" sx={{ pt: 5, fontWeight: 650 }}>
            SUPERIOR CUSTOMER SERVICE
          </Typography>
          <Typography align="center" width={260} sx={{ pt: 3, pl: 13 }}>
            We put our experience and relationships to good use and are
            available to solve your bus travel issues.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "20%",
            minHeight: 400,
            backgroundColor: "#ffff",
            border: 1.5,
            ml:'2%'
          }}
        >
          <Typography sx={{ pl: "27%", pt: "5%" }}>
            <img src="../../lowest.png" alt="logo" height={130} />
          </Typography>
          <Typography align="center" sx={{ pt: 5, fontWeight: 650 }}>
            LOWEST PRICES
          </Typography>
          <Typography align="center" width={260} sx={{ pt: 3, pl: 13 }}>
            We always give you the lowest price with the best partner offers.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "20%",
            minHeight: 400,
            backgroundColor: "#ffff",
            border: 1.5,
            ml:'2%'
          }}
        >
          <Typography sx={{ pl: "27%", pt: "5%" }}>
            <img src="../../benefits.png" alt="logo" height={130} />
          </Typography>
          <Typography align="center" sx={{ pt: 5, fontWeight: 650 }}>
            UNMATCHED BENEFITS
          </Typography>
          <Typography align="center" width={260} sx={{ pt: 3, pl: 13 }}>
            We take care of your travel beyond ticketing by providing you with
            innovative and unique benefits.
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default Home;
