
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
 import "./Charts.css";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    .
  </Box>
);

const Chart = () => {

  
  const [userCount, setUserCount] = useState();
  const [premiumuser, setpremiumuser] = useState();
  const [productCount, setProductCount] = useState();
  const [orderData, setOrderData] = useState([]);
  const [block, setBlock] = useState();

  const [bookingdata,setbookingdata] = useState([])
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(()=>{
    (async()=>{
      try{
        let weeklydata = await axios.get('/admin/getweeklybooking')
        setbookingdata(weeklydata.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])







  



  return (
    <Container>
      <div style={{ textAlign: "center" }} >
        <div className="App">


<Typography sx={{mt:10,mr:40,fontSize:"1.5rem",fontWeight:700}}>Weekly Bookings</Typography>
          <BarChart
            width={900}
            height={500}
            data={bookingdata}
            margin={{top: 100}}
            barSize={30}
          >
          
            <XAxis 
              dataKey="_id"
              scale="point"
            padding={{ left: 20, right: 10 }}  
            />
           
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
      </div>
    </Container>
  );
};

export default Chart