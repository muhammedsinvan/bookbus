import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { borderColor, Box, fontSize } from "@mui/system";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import { Toast } from '../../../Helpers/Alert';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Coupen = () => {

  const [data,setdata]=useState([])

  const [refresh,setrefresh]=React.useState(false)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter the field"),
    value: Yup.string().required("Please enter the field"),
    date: Yup.string().required("Please enter the date"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onsubmit(datas) {
    try { 
      let response = await axios.post("/admin/newcoupen", datas)
      if(response.status === 200){
        toast("Coupen added success",{type:"success"})
        setrefresh(!refresh)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };


  useEffect (()=>{ 
    (async()=>{
      try{
        let allcoupen = await axios.get('/admin/getallcoupen',config)
        setdata(allcoupen.data)
        setrefresh(!refresh)

      }catch(error){
        console.log(error)
      }
    })()  
  },[refresh])

  async function deletecoupen(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await axios.post(`/admin/deletecoupen/${id}`);
        setrefresh(!refresh);
      }
    });
  }

  return (
    <Grid container>
      <Grid item xl={6} md={12}>
        <Box
          width="70%"
          sx={{
            backgroundColor: "white",
            ml: "28%",
            boxShadow: "5px 5px black",
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: 700 }} align="center">
            ADD COUPEN
          </Typography>
          <br />
          <br />

          <Typography
            component="span"
            sx={{ ml: "8%", fontWeight: "700", fontSize: "1.2rem" }}
          >
            Enter The Coupen Name :
          </Typography>
          <TextField
            component="span"
            label="Coupen Name"
            id="fullWidth"
            sx={{ ml: 4, mt: -2 }}
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
          <br />
          <br />
          <br />

          <Typography
            component="span"
            sx={{ ml: "8%", fontWeight: "700", fontSize: "1.2rem" }}
          >
            Enter The Coupen value:
          </Typography>
          <TextField
            component="span"
            label="Coupen Value"
            id="fullWidth"
            sx={{ ml: 5, mt: -2 }}
            {...register("value")}
            error={errors.value ? true : false}
            helperText={errors.value?.message}
          />

          <br />
          <br />
          <br />

          <Typography
            component="span"
            sx={{ ml: "8%", fontWeight: "700", fontSize: "1.2rem" }}
          >
            Enter The Coupen Validity:
          </Typography>
          <TextField
            component="span"
            type="date"
            id="fullWidth"
            sx={{ ml: 3, mt: -2 }}
            {...register("date")}
            error={errors.date ? true : false}
            helperText={errors.date?.message}
          />

          <br />
          <br />
          <br />
          <Button
            variant="contained"
            sx={{ ml: "39%" }}
            onClick={handleSubmit(onsubmit)}
          >
            Submit
          </Button>
          <br />
          <br />
          <br />
        </Box>
      </Grid>
      <Grid item xl={6} md={12}>
        <Box
          width="70%"
          sx={{
            backgroundColor: "white",
            ml: "18%",
            boxShadow: "0px 5px 5px black",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Coupen Name</TableCell>
                <TableCell>Coupen Value</TableCell>
                <TableCell>Expire</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((res)=>(
         <TableRow
         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
       >
         <TableCell>{res.name}</TableCell>
         <TableCell>{res.value}</TableCell>
         <TableCell>{moment(res.date).format("DD/MM/YYYY")}</TableCell>
         <Button variant="contained" value={res._id} onClick={ e => deletecoupen(e.target.value)}>Delete</Button>
       </TableRow>
              ))}
     
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Coupen;
