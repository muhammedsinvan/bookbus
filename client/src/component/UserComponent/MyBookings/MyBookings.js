import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Container from "@mui/material/Container";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import axios from "axios";
import JsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import MyTicket from "./Ticket";


const MyBookings = () => {
    const [data,setdata]=useState([])
    const [bookingdata,setbookingdata] = useState([])
    const [open, setOpen] =useState(false);


    useEffect(()=>{
        (async()=>{
            let userid = localStorage.getItem("userid")
            try{
                let bookings = await axios.get(`/mybookings/${userid}`)
                setdata(bookings.data)
            }catch(error){
                console.log(error)
            }
        })()
    },[])

   async function ticketdetail(bookingid){
     try{
      let bookingdata = await axios.get(`/getdetailticket/${bookingid}`)
      setbookingdata(bookingdata.data)
      setOpen(true)
     }catch(error){
       console.log(error)
     }
    }


  return (
    <Container fixed sx={{minHeight:"80vh"}}>
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
         MY BOOKINGS
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          
  <TableRow>
    
  <TableCell>Date Of Bookings</TableCell>
  <TableCell>BUS</TableCell>
  <TableCell>FROM</TableCell>
  <TableCell>TO</TableCell>
  <TableCell>NO OF SEATS</TableCell>
  <TableCell>AMOUNT</TableCell>
  <TableCell>DETAIL</TableCell>
  
</TableRow>
           
          </TableHead>

          
            <TableBody>
            {data.map((data)=>(
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                
                
                <TableCell>{moment(data.createdAt).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{data.busdetail.busname}</TableCell>
                <TableCell>{data.busdetail.from}</TableCell>
                <TableCell>{data.busdetail.to}</TableCell>
                <TableCell>{data.seatdata.length}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <Button variant="contained" value={data._id} onClick={e => ticketdetail(e.target.value)}>View Details</Button>
              </TableRow>
            ))}
            </TableBody>
        
        </Table>
      </TableContainer>
      <MyTicket open={open} bookingdata={bookingdata} />
    </div>

  </Container>
  )
}

export default MyBookings