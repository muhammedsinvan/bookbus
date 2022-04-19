import {
  Card,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import "./ticketdetail.css";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Payment from "../Payment/Payment.js";
import Swal from "sweetalert2";

const TicketDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  //Bus  data sored
  const [data, setData] = useState([]);

  //Seat number stored
  const [seat, setSeat] = useState([]);

  const [code, setcode] = useState("");

  const [value, setvalue] = useState([]);

  const [userid, setuserid] = useState("");

  //Tacking detail of bus using id
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/ticketdetail/${params.id}`);
        setData(data);

        let userid = await localStorage.getItem("userid");
        setuserid(userid);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //seat taking from localstorage
  useEffect(() => {
    let reservedSeats = JSON.parse(localStorage.getItem("reservedSeats"));
    setSeat(reservedSeats);
  }, []);

  //validation
  const validationSchema = Yup.object().shape({
    user: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Enter the name"),
        age: Yup.string().required("Enter the age"),
        gender: Yup.string().required("Enter the gender"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onsubmit(datas) {
    localStorage.setItem("userseatdata", JSON.stringify(datas.user));
    localStorage.setItem("busid", params.id);
    if (value.value != null) {
      localStorage.setItem("coupen", value.value);
      localStorage.setItem("coupenname", value.name);
    }

    navigate("/payment");
  }

  async function coupensubmit() {
    try {
      const newcoupen = {
        coupens: code,
      };
      let { data } = await axios.post("/admin/checkcoupen", newcoupen);
      console.log(data);
      if (data.length === 0) {
        setvalue(0);
        Swal.fire("Sorry !", "Coupen is invalid!", "Try another");
      } else {
        let usedcoupen = await axios.post(`/usedcoupen/${userid}`, newcoupen);
        if (usedcoupen.data >= 0) {
          setvalue(0);
          Swal.fire("Sorry !", "Coupen is already used!", "Apply");
        } else {
          Swal.fire("Good job!", "Coupen applied success!", "Apply");
          setvalue(data[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container sx={{ backgroundColor: "white", height: 1000 ,minHeight:"80vh"}}>
      <Grid item xs={6}>
        <Box sx={{ backgroundColor: "white", height: "100%" }}>
          <div>
            <Grid>
              <Box sx={{ backgroundColor: "white", height: "auto" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "2rem",
                    pl: "5%",
                    pt: "2%",
                    color: "	#541616",
                  }}
                >
                  {data.from} <ArrowRightAltIcon style={{ fontSize: "60px" }} />{" "}
                  {data.to}
                </Typography>
                <Typography
                  sx={{ fontWeight: 550, fontSize: "1.5rem", pl: "5%" }}
                >
                  {data.busname} Bus
                </Typography>
                <Typography sx={{ pl: "5%", color: "#4F6367" }}>
                  {data.bustype} / {data.busseat}
                </Typography>
                <div className="bustime">
                  <Typography
                    className="text"
                    component="span"
                    sx={{ fontSize: "1.5rem", fontWeight: 750 }}
                  >
                    {data.startingtime}{" "}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 700, color: "#4F6367" }}
                  >
                    {moment(data.startingdate).format("DD/MM/YYYY")}{" "}
                  </Typography>
                  <Typography component="span" sx={{ pl: 5 }}>
                    {" "}
                    -----------------------{" "}
                  </Typography>
                  <Typography
                    className="text"
                    component="span"
                    sx={{ fontSize: "1.5rem", fontWeight: 750 }}
                  >
                    {data.endingtime}{" "}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 700, color: "#4F6367" }}
                  >
                    {moment(data.endingdate).format("DD/MM/YYYY")}{" "}
                  </Typography>
                  <Typography className="duration">
                    {data.duration}Hrs
                  </Typography>
                </div>

                <Typography
                  sx={{ pl: "12%", fontSize: "1.5rem", fontWeight: 700 }}
                  component="span"
                >
                  {data.from}
                </Typography>
                <Typography
                  sx={{ pl: "24%", fontSize: "1.5rem", fontWeight: 700 }}
                  component="span"
                >
                  {data.to}
                </Typography>

                <Typography
                  sx={{
                    pt: "5%",
                    pl: "5%",
                    fontWeight: 750,
                    fontSize: "1.2rem",
                  }}
                >
                  Enter Traveller Details
                </Typography>

                {seat.map((data, i) => (
                  <Grid item>
                    <Box
                      sx={{
                        ml: 8,
                        mr: 5,
                        mt: 3,
                        backgroundColor: "#F0F7F4",
                        height: 150,
                        boxShadow: "1px 3px 1px #9E9E9E",
                      }}
                      key={i}
                    >
                      <Typography
                        align="center"
                        sx={{ fontSize: "1.2rem", fontWeight: 750 }}
                      >
                        Seat {data}
                      </Typography>
                      <TextField
                        label="Name"
                        variant="standard"
                        sx={{ ml: "3%" }}
                        {...register(`user.${i}.name`)}
                        error={errors.user?.[i].name ? true : false}
                        helperText={errors.user?.[i]?.name?.message}
                      />
                      <TextField
                        component="span"
                        label="Age (in yrs)"
                        type="number"
                        variant="standard"
                        sx={{ ml: "5%", width: "20%" }}
                        {...register(`user.${i}.age`)}
                        error={errors.user?.[i].age ? true : false}
                        helperText={errors.user?.[i]?.age?.message}
                      />
                      <FormControl
                        component="span"
                        variant="standard"
                        sx={{ ml: "4%", minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          label="Gender"
                          {...register(`user.${i}.gender`)}
                          error={errors.user?.[i].gender ? true : false}
                          helperText={errors.user?.[i]?.gender?.message}
                        >
                          <MenuItem value={"FeMale"}>FeMale</MenuItem>
                          <MenuItem value={"Male"}>Male</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
          </div>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ backgroundColor: "white", height: "100%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              width: "50%",
              height: "25%",
              ml: "25%",
              mr: "25%",
              mt: "5%",
              boxShadow: "1px 3px 3px 3px #9E9E9E",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
                pt: 3,
                color: "green",
              }}
              align="center"
            >
              Enter Your coupen code
            </Typography>
            <FormControl sx={{ width: "25ch", ml: 16, mt: 5 }}>
              <OutlinedInput
                placeholder="Please enter coupen code"
                name="code"
                id="code"
                value={code}
                onChange={(e) => setcode(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ mt: 3, mr: 5, ml: 24 }}
              onClick={coupensubmit}
            >
              Submit
            </Button>
          </Box>

          <Box
            sx={{
              backgroundColor: "white",
              width: "50%",
              height: "35%",
              ml: "25%",
              mr: "25%",
              mt: "5%",
              boxShadow: "1px 3px 1px 1px #9E9E9E",
            }}
          >
            <Box sx={{ width: "100%", backgroundColor: "blue", height: "25%" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ ml: "24%", mt: "5%", backgroundColor: "black" }}
                onClick={handleSubmit(onsubmit)}
              >
                {" "}
                COUNTINUE TO BOOK NOW{" "}
              </Button>
            </Box>
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem" }}
            >
              Selected Seats
            </Typography>
            {seat.map((data) => (
              <Typography
                component="span"
                sx={{ fontWeight: 750, fontSize: "1.1rem", pl: 10 }}
              >
                {data}
              </Typography>
            ))}
            <br />
            <br />
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem" }}
            >
              Seat Number
            </Typography>
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem", pl: "19%" }}
            >
              {seat.length}
            </Typography>
            <br />
            <br />
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem" }}
            >
              Base Fare
            </Typography>
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem", pl: "23%" }}
            >
              {data.price}
            </Typography>
            <br />
            <br />

            {value != 0 && (
              <Typography
                component="span"
                sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem" }}
              >
                Coupen
              </Typography>
            )}

            {value != 0 && (
              <Typography
                component="span"
                sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem", pl: "23%" }}
              >
                {(data.price * seat.length * value.value) / 100}
              </Typography>
            )}

            <hr />
            <Typography
              component="span"
              sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem" }}
            >
              Total Fare
            </Typography>
            {value != 0 ? (
              <Typography
                component="span"
                sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem", pl: "23%" }}
              >
                {data.price * seat.length -
                  (data.price * seat.length * value.value) / 100}
              </Typography>
            ) : (
              <Typography
                component="span"
                sx={{ m: 2, fontWeight: 750, fontSize: "1.1rem", pl: "23%" }}
              >
                {data.price * seat.length}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TicketDetail;
