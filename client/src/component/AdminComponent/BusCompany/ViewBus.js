import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Container from "@mui/material/Container";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";


const ViewBus = () => {

    const params = useParams()
    const [data,setdata]= useState([])

    const adminInfo = localStorage.getItem('admintoken')

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo}`,
      },
    };

    useEffect(()=>{
        (async()=>{
            try{
let data = await axios.get(`/admin/getbuses/${params.id}`,config)
setdata(data.data)
            }catch(error){
                console.log(error)
            }
        })()
    },[])

  return (
    <Container fixed>
    <div id="report">
      <Box
        component="span"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={50}
        fontSize={34}
      ></Box>
      <TableContainer component={Paper}>
        <Box
          component="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
          fontSize={34}
          bgcolor="#E2E8F0"
          color="#424242"
        >
          BUSES
        </Box>

        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>    
              <TableCell>Starting Date</TableCell>
              <TableCell>Ending Date</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>No Of Seat Booked</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>

    
            
            <TableBody>
  {data.map((res)=>(
    <TableRow
sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
> 
<TableCell>{moment(res.startingdate).format("DD/MM/YYYY")} </TableCell>
<TableCell>{moment(res.endingdate).format("DD/MM/YYYY")}</TableCell>
<TableCell>{res.from}</TableCell>
<TableCell>{res.to}</TableCell>
<TableCell>{res.seat.length}</TableCell>
<TableCell>{res.price}</TableCell>  
</TableRow>
  ))}                  
            
            </TableBody>
         
        </Table>
      </TableContainer>
    </div>
  </Container>
  )
}

export default ViewBus
