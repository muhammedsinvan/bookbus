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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

const ViewBanner = () => {

  const navigate = useNavigate()

  const [data,setdata] = React.useState([])

  const [refresh,setrefresh] = React.useState(false)

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  React.useEffect(()=>{
    (async()=>{
      try{
        let data = await axios.get('/admin/getallbanner',config)
        setdata(data.data)
        setrefresh(false)
      }catch(error){
        console.log(error)
      }
    })()
  },[refresh])

  function viewaddbanner(){
    navigate('/admin/banner')
  }

  async function deletebanner (id){
    try{
      let deleted = await axios.post(`/admin/deletebanner/${id}`)
      console.log(deleted)
      setrefresh(!refresh);
      if(deleted.status === 200){ 
        toast("Banner is Deleted",{type:"success"})
      }else{
        toast("Error occured",{type:"failed"})
      }
    }catch(error){
      console.log(error)
      toast("Error occured",{type:"failed"})
    }
  }

  return (
    <TableContainer component={Paper} sx={{ mt:2,boxShadow:10}} >
     <Button
            variant="contained"
            sx={{ ml: "90%" }}
            onClick={viewaddbanner}
          >
            Add Banner
          </Button>
    <Table sx={{ maxWidth: 1100,ml:65 }} aria-label="customized table">
   
      <TableHead>
        <TableRow>
        <StyledTableCell align="right">Date</StyledTableCell>
        <StyledTableCell align="right">Banner</StyledTableCell>
          <StyledTableCell align='right'>Title</StyledTableCell>
          <StyledTableCell align="right">Sub Title</StyledTableCell>
          <StyledTableCell align="right">Action</StyledTableCell>
        </TableRow>
      </TableHead>

      

      <TableBody>
        {data.map((res)=>(
          <StyledTableRow>
          <StyledTableCell align="right">{moment(res.createdAt).format("DD/MM/YYYY")}</StyledTableCell>
          <StyledTableCell align="right"><img src={res.image} height="30" width="40" /></StyledTableCell>
          <StyledTableCell align="right">{res.title}</StyledTableCell>
          <StyledTableCell align="right">{res.subtitle}</StyledTableCell>
          <StyledTableCell align="right"><Button variant="contained" value={res._id} onClick={ e => deletebanner (e.target.value)}>Delete</Button></StyledTableCell>
          
        </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default ViewBanner