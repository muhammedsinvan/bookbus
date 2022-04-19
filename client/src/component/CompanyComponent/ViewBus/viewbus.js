import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from "sweetalert2";
import { Toast } from '../../../Helpers/Alert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { 
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {

  const navigate = useNavigate()



function editbus(id){
   navigate(`/company/home/editbus/${id}`)
}

  const[data,setdata]=React.useState([])  
  const [refresh,setrefresh]=React.useState(false)


  React.useEffect(()=>{
    let companyid= localStorage.getItem("companyid")
    axios.get(`/company/allbus/${companyid}`)
    .then((res)=>{
       setrefresh(false)
      setdata(res.data)
    })
    .catch(e=>console.log(e))
  },[refresh])


  function viewbookings(id){
    console.log(id)
    navigate(`/company/viewbooking/${id}`)
  }
  


  async function deletebus(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await axios.post(`/company/deletebus/${id}`);
        setrefresh(!refresh);
        if (data.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Property Deleted",
          });
        }
      }
    });
  }

  
  return (

    <TableContainer component={Paper} sx={{borderRadius:4 , mt:2,boxShadow:10,mr:6}} >
    
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
        <TableHead>
          <TableRow>
            <StyledTableCell align='right'>Busname</StyledTableCell>
            <StyledTableCell align="right">Reg No</StyledTableCell>
            <StyledTableCell align="right">Bus Type</StyledTableCell>
            <StyledTableCell align="right">Bus Seat</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            <StyledTableCell align="right">Starting Date</StyledTableCell>
            <StyledTableCell align="right">Ending Date</StyledTableCell>
            <StyledTableCell align="center">View Bookigs</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        

        <TableBody>
 {data.map((data)=>(
            <StyledTableRow>
              <StyledTableCell align="right">{data.busname}</StyledTableCell>
              <StyledTableCell align="right">{data.regno}</StyledTableCell>
              <StyledTableCell align="right">{data.bustype}</StyledTableCell>
              <StyledTableCell align="right">{data.busseat}</StyledTableCell>
              <StyledTableCell align="right">{data.from}</StyledTableCell>
              <StyledTableCell align="right">{data.to}</StyledTableCell>
              <StyledTableCell align="right">{moment(data.startingdate).format("DD/MM/YYYY")}</StyledTableCell>
              <StyledTableCell align="right">{moment(data.endingdate).format("DD/MM/YYYY")}</StyledTableCell>   
              <StyledTableCell  align="center"><Button onClick={ e => viewbookings(e.target.value)} value={data._id} > VIEW BOOKINGS</Button></StyledTableCell>
              <StyledTableCell align="center"><Button onClick={e => editbus(e.target.value)} value={data._id}> Edit</Button> 
              <Button onClick={ e => deletebus(e.target.value)} value={data._id}> Delete</Button></StyledTableCell>
            </StyledTableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

