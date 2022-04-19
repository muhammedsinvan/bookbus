import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../Home/home.css";
import axios from "axios";
import Chart from "./Chart";
import PieChart from './PieChart'

const Home = () => {

  const [total,settotal]=useState('')

  const [booking,setbooking]=useState('')

  const [income,setincome]=useState('')

  useEffect(()=>{
    (async()=>{
try{
 let companyid=localStorage.getItem('companyid')

 let totalbus=await axios.get(`/totalbus/${companyid}`)
 settotal(totalbus.data)

 let totalbookings = await axios.get(`/totalbookings/${companyid}`) 
 setbooking(totalbookings.data)

 let totalincome = await axios.get(`/totalincome/${companyid}`)
setincome(totalincome.data)

} catch(error){
  console.log(error)
}
    })()
  },[])





  return (
    <Grid container>
      <Box class="card card-1">
<Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total buses
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
 {total}
</Typography>
      </Box>

      <Box class="card card-1">
      <Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Bookings
</Typography>

<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
{booking}
</Typography>
      </Box>
      <Box class="card card-1">
      <Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Income
</Typography>

  <Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
{income[0]?.totalamount}
</Typography>
      </Box>

      <Box class="card card-1">
      <Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Profit
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
 {Math.round((income[0]?.totalamount)/100)*90}
</Typography>
      </Box>
<Grid container>

  <Grid item xl={6} align="center">
  <Chart />
  </Grid>

<Grid item xl={6} align="center">
<PieChart/>
</Grid>

</Grid>


    </Grid>
  );
};

export default Home;
