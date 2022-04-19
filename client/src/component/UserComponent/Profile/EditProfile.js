import React from "react";
import { Grid, Input, Typography } from "@mui/material";
import { Box, minHeight } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Container, CardActionArea, CardActions } from "@mui/material";
import { FormControl } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, seteamil] = useState();
  const [id,setid]=useState();


  React.useEffect(async () => {
    let userid = localStorage.getItem("userid");
    setid(userid)
    let datas = await axios.get(`/profile/${userid}`);
    setfirstname(datas.data.firstname)
    setlastname(datas.data.lastname)
    seteamil(datas.data.email)
    setid(datas.data._id)
  }, []);


  async function updateprofile() {
    console.log("reached")

    try {
        const updatedata = {
            firstname,
            lastname,
            email,
            id
        };
        console.log("heyyyy")
          await axios
            .post("/updateprofile", updatedata)
            .then((res) => {
              console.log(res);
              navigate("/profile");
            })
            .catch((err) => {
              console.log(err);
            });
     } catch (error) { }
};




  return (
    <div>
      <Grid container sx={{minHeight:"80vh"}}>
        <Container
          align="center"
          sx={{ width: { xs: "100%", md: "50%" }, mt: "13%" }}
        >
          <Card sx={{ boxShadow: 5, minHeight: 400 }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl>
                <div>
                  <CardMedia
                    sx={{ borderRadius: 100, width: 150, height: 150, mt: 4 }}
                    component="img"
                    image="../../avathar.jpg"
                    alt="Profile avathar"
                  />
                </div>
                <div>
                  <Typography component="span" sx={{ fontWeight: "800" }}>
                    First Name :{" "}
                  </Typography>
                  <Input component="span" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
                  <br />
                  <br />
                  <Typography component="span" sx={{ fontWeight: "800" }}>
                    Last Name :{" "}    
                  </Typography>
                  <Input component="span" value={lastname}  onChange={(e)=>setlastname(e.target.value)} />
                  <br />
                  <br />
                  <Typography component="span" sx={{ fontWeight: "800" }}>
                    Email : {"  "}
                  </Typography>
                  <Input component="span" value={email} onChange={(e)=>seteamil(e.target.value)}  />
                </div>
              </FormControl>
            </Box>
            <Button variant="contained" color="success" value={id} onClick={(e)=>updateprofile(e.target.value)} sx={{ mt: 3 }}>
              UPDATE
            </Button>
          </Card>
        </Container>
      </Grid>
    </div>
  );
};

export default EditProfile;
