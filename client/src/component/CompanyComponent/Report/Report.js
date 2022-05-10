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

import {ExportToExcel} from '../../../Helpers/Execl'

const Report = () => {

  const [data,setdata] = useState([])

  const [datas, setDatas] = React.useState([])

  const fileName = "myfile";

  useEffect(()=>{
    (async()=>{
      let companyid= localStorage.getItem("companyid")
      try{
        let bookings = await axios.get(`/getreport/${companyid}`)
          setdata(bookings.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])
  

  useEffect(() => {
    const fetchData = () =>{
     axios.get('https://jsonplaceholder.typicode.com/posts').then(r => setDatas(r.data) )
    }
    fetchData()
  }, [])

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a2");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };


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
      <Button 
            onClick={generatePDF}
            type="button"
            sx={{ color: "white", backgroundColor: "black" ,mr:"2%"}}
          >
            {" "}
            <DownloadIcon /> Export PDF
          </Button>
          
          <ExportToExcel style={{minWidth:"20%"}}  apiData={data} fileName={fileName} />
           

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

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          
  <TableRow>
    
  <TableCell>DATE</TableCell>
  <TableCell>NO.OF BOOKINGS</TableCell>
  {/* <TableCell>NO OF BUSES</TableCell> */}
    <TableCell>INCOME</TableCell>
  <TableCell>PROFIT</TableCell>
  
</TableRow>
           
          </TableHead>

          {data.map((res)=>(       
            <TableBody>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{res._id}</TableCell>
                <TableCell>{res.numberOfBoookings}</TableCell>
                <TableCell>{res.amount}</TableCell>
                <TableCell>{Math.round((res.amount)/100)*90}</TableCell>
              </TableRow>
            </TableBody>
              ))} 
        </Table>
      </TableContainer>
    </div>

  </Container>
  )
}

export default Report
