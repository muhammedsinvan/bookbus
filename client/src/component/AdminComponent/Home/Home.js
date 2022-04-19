import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import './Home.css'
import PieChart from './PieChart'
import PieCharts from './PieChart2'

const Home = () => {

  const [allcompany,setallcompany] = useState()
  const [allbus,setallbus] = useState()
  const [allusers,setallusers] = useState()
  const [income,setincome] = useState([])

  useEffect(()=>{
    (async(req,res)=>{
      try{
        let getallcompany = await axios.get('/getallcompany')
        setallcompany(getallcompany.data)

        let getallbus = await axios.get('/getallbuses')
          setallbus(getallbus.data)

          let getallusers = await axios.get('/getallusers')
          setallusers(getallusers.data)

          let income = await axios.get('/totalincome')
          setincome(income.data)

      }catch(error){
        console.log(error)
      }
    })()
  },[])


  return (
    <div>
    <Grid container sx={{ml:'8%'}}  >
      <Grid item >
    <Box class="card card-1" >
<Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Companies
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
 {allcompany}  
</Typography>
      </Box>
      </Grid>    

<Grid item >
      <Box class="card card-1">
<Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total buses
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
 {allbus}  
</Typography>
      </Box>
      </Grid>

      <Grid item >
      <Box class="card card-1">
<Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Users
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
 {allusers}  
</Typography>
      </Box>
      </Grid>

<Grid item >
      <Box class="card card-1" >
<Typography sx={{fontWeight:600,fontSize:'2rem',m:2,color:'white'}}>
  Total Income
</Typography>
<Typography sx={{fontWeight:600,fontSize:'2rem',m:5,color:'white'}} align="center">
{Math.round((income[0]?.TotalSum)*10)/100}
</Typography>
      </Box>  
      </Grid>
    </Grid>
 
      <Grid item xs={12} align="center">
      <Chart/>
      </Grid>
      <Grid container>
<Grid item xs={6} align="center"> 
<PieChart/>
</Grid>
<Grid item xs={6} align="center"> 
<PieCharts/>
</Grid>
    </Grid>
 
    </div>
  )
}

export default Home