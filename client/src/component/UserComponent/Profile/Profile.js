import { Grid, Typography } from "@mui/material";
import { Box, minHeight } from "@mui/system";
import React from "react";
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

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [newvalues, setnewValues] = React.useState({
    newpassword: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const newhandleChange = (prop) => (event) => {
    setnewValues({ ...newvalues, [prop]: event.target.value });
  };

  const newhandleClickShowPassword = () => {
    setnewValues({
      ...newvalues,
      showPassword: !newvalues.showPassword,
    });
  };

  const newhandleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [data, setdata] = useState("");
  const [open, setopen] = useState(false);
  const [error, seterror] = useState(false);
  console.log(data);

  React.useEffect(async () => {
    let userid = localStorage.getItem("userid");
    let datas = await axios.get(`/profile/${userid}`);
    setdata(datas.data);
  }, []);

  function editprofile() {
    navigate("/profile/edit");
  }

  function changepassword() {
    setopen(!open);
  }

  async function newpassword() {
    try {
      let userid = localStorage.getItem("userid");
      const arrpass = { values, newvalues };
      console.log(arrpass);
      let getpassword = await axios.post(`/checkpassword/${userid}`, arrpass);
      if (getpassword.data === 401) {
        seterror(true);
      } else {
        setopen(!open)
        seterror(false);
        setValues('')
        setnewValues('')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container>
      <Container
        align="center"
        sx={{ width: { xs: "100%", md: "50%" }, mt: "13%", minHeight: "80vh" }}
      >
        <Card sx={{ boxShadow: 5, minHeight: 400 }}>
          <div align="right">
            <Button sx={{ m: 2 }} variant="contained" onClick={editprofile}>
              Edit
            </Button>
            <Button sx={{ m: 2 }} variant="contained" onClick={changepassword}>
              Change Password
            </Button>
          </div>

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
                <Typography component="span">{data.firstname}</Typography>
                <br />
                <br />
                <Typography component="span" sx={{ fontWeight: "800" }}>
                  Last Name :{" "}
                </Typography>
                <Typography component="span">{data.lastname}</Typography>
                <br />
                <br />
                <Typography component="span" sx={{ fontWeight: "800" }}>
                  Email :{" "}
                </Typography>
                <Typography component="span">{data.email}</Typography>
                <br />
                <br />
                {open && (
                  <div>
                    <Typography component="span" sx={{ fontWeight: "800" }}>
                      Current Password :{" "}
                    </Typography>

                    <FormControl
                      sx={{ mb: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    {error === true && (
                      <Typography
                        color="red"
                        sx={{ fontSize: "0.8rem", ml: 14 }}
                      >
                        Enter the correct password
                      </Typography>
                    )}
                    <br />

                    <Typography component="span" sx={{ fontWeight: "800" }}>
                      New Password :{" "}
                    </Typography>

                    <FormControl sx={{ width: "25ch" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={newvalues.showPassword ? "text" : "password"}
                        value={newvalues.newpassword}
                        onChange={newhandleChange("newpassword")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={newhandleClickShowPassword}
                              onMouseDown={newhandleMouseDownPassword}
                              edge="end"
                            >
                              {newvalues.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <br />
                    <Button
                      sx={{ m: 2 }}
                      variant="contained"
                      onClick={newpassword}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
          </Box>
        </Card>
      </Container>
    </Grid>
  );
};

export default Profile;
