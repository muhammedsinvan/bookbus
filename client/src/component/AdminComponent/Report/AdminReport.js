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
import Button from '@mui/material/Button';
import JsPDF from "jspdf";
import { toast } from "react-toastify";
import {ExportToExcel} from '../../../Helpers/Execl'


const AdminReport = () => {

const [data,setdata] = useState([])

const [datas, setDatas] = React.useState([])

const fileName = "myfile";

const adminInfo = localStorage.getItem('admintoken')

const config = {
  headers: {
    Authorization: `Bearer ${adminInfo}`,
  },
};

  useEffect(()=>{
    (async()=>{
      try{
        let data = await axios.get('/admin/getsalesreport',config)
        setdata(data.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("Busticket.pdf");
      toast("Success ticket download is completed",{type:"success"})
    });
  }


  useEffect(() => {
    const fetchData = () =>{
     axios.get('https://jsonplaceholder.typicode.com/posts').then(r => setDatas(r.data) )
    }
    fetchData()
  }, [])
  


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
    <Button variant="contained" onClick={generatePDF}>Download pdf</Button>

    <ExportToExcel  apiData={data} fileName={fileName} />
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
          SALES REPORT
        </Box>

        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>    
              <TableCell>DAte</TableCell>
              <TableCell>No Of Bookings</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>company Profit</TableCell>
              <TableCell>Admin Profit</TableCell>
            </TableRow>
          </TableHead>

            <TableBody>

              {data.map((res)=>(
   <TableRow
   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
   > 
   <TableCell>{res._id} </TableCell>
   <TableCell>{res.numberOfBoookings}</TableCell>
   <TableCell>{res.amount}</TableCell>
   <TableCell>{Math.round(res.amount/100)*90}</TableCell>
   <TableCell>{Math.round(res.amount*10)/100}</TableCell>
   </TableRow>
              ))}
                
            
            </TableBody>
         
        </Table>
      </TableContainer>
    </div>
  </Container>
  )
}

export default AdminReport