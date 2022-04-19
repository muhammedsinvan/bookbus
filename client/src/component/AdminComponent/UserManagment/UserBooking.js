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
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Button from '@mui/material/Button';
const UserBooking = () => {

    const params = useParams()

    const [data,setdata] = useState([])

    const adminInfo = localStorage.getItem('admintoken')

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo}`,
      },
    };

    useEffect(()=>{
        (async()=>{
            try{
let {data} = await axios.get(`/admin/viewbookings/${params.id}`,config)
setdata(data)
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
          User Bookings
        </Box>

        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Bus name</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>No Of Seat</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>

    
            
            <TableBody>
{data.map((res)=>(
  <TableRow
sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
>
  {console.log(res)}
<TableCell>{moment(res.createdAt).format("DD/MM/YYYY")}</TableCell>
<TableCell>{res.busdetail.busname}</TableCell>
<TableCell>{res.busdetail.from}</TableCell>
<TableCell>{res.busdetail.to}</TableCell>
<TableCell>{res.seat.length}</TableCell>
<TableCell>{res.amount}</TableCell>
</TableRow>
))}


            </TableBody>
         
        </Table>
      </TableContainer>
    </div>
  </Container>
  )
}

export default UserBooking
