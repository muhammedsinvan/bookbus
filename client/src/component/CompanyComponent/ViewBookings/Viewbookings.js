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
import { Box, Typography } from "@mui/material";
import axios from "axios";
import JsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router-dom";
import moment from "moment";

const Viewbookings = () => {
  const params = useParams();

  const [datas, setdata] = useState([]);
  const [busdetail,setbusdetail] = useState([])

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a2");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/company/bookingdata/${params.id}`);
        let busdetail = await axios.get(`/company/bookingdatas/${params.id}`)
        setbusdetail(busdetail.data)
        setdata(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  


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
            sx={{ color: "white", backgroundColor: "black" }}
          >
            {" "}
            <DownloadIcon /> Export PDF
          </Button>
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
            <Typography sx={{fontSize:"2rem", fontWeight:"540",mr:"2%"}}>{busdetail.busname}</Typography>
            

            BOOKINGS

          </Box>

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date Of Bookings</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>

            {datas.map((data,i) => (
              
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {moment(data.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{data.seatdata.name}</TableCell>
                  <TableCell>{data.seatdata.age}</TableCell>
                  <TableCell>{data.seatdata.gender}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default Viewbookings;
