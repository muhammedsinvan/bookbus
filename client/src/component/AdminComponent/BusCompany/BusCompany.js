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
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Button from '@mui/material/Button';


const BusCompany = () => {

  const [data,setdata] = useState([])

  const navigate = useNavigate()

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };


  useEffect(()=>{
    (async()=>{
      try{
        let data = await axios.get('/admin/getallcompany',config)
        setdata(data.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  function viewbus(id){
    navigate(`/admin/company/viewbus/${id}`)
  }


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
            COMPANIES
          </Box>

          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name Of Company</TableCell>
                <TableCell>Name Of Owner</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>View Bus</TableCell>
              </TableRow>
            </TableHead>

      
              
              <TableBody>
                {data.map((res)=>(
  <TableRow
  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
>
  <TableCell>
  {moment(res.createdAt).format("DD/MM/YYYY")}
  </TableCell>
  <TableCell>{res.company}</TableCell>
  <TableCell>{res.firstname} {res.lastname}</TableCell>
  <TableCell>{res.email}</TableCell>
  <TableCell><Button variant="contained" value={res._id} onClick={e => viewbus(e.target.value)}>View Bus</Button>
</TableCell>
</TableRow>
                ))}
              
              </TableBody>
           
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}

export default BusCompany