import * as React from "react";
import axios from "axios";
import "./ViewBus.css";
import { Button, Divider, FormControlLabel, Grid, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Seat from "../../UserComponent/BusSeat/BusSeat.js";
import { Typography } from "@mui/material";
import moment from "moment";
import NotFound from "../ViewBus/NoFound.js";

function Row({ searchdata }) {
  const [page, setpage] = useState(false);
  const [result, setResult] = useState([]);
  const [check, setCheck] = useState([]);


  React.useEffect(() => {
    const search = async () => {
      try {
        let { data } = await axios.post("/viewbus", searchdata);
        if (data.length >= 1) {
          setResult(data);
        } else {
          setpage(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    search();
  }, []);

  const [box, setbox] = useState(false);

  const [id, setid] = useState([]);
  // const [company,setcompany] = useState(result.companyid)

  //const [companydetail,setcompanydetail]=useState([])
  // console.log(companydetail)

  function seatBoxToogle(id) {
    setid(id);
    setCheck(id);
    setbox(!box);
  }

 function highprice(){
  const sorted = [...result].sort((a, b) => {
    return b.price - a.price;
  });
  setResult(sorted)
 }

 function lowprice(){
  const sorted = [...result].sort((a, b) => {
    return a.price - b.price;
  });
  setResult(sorted)
 }


//  function actype(){
//   const sorted = [...result].sort((a, b) => {
//     return a.bustype - b.bustype;
//   });
//   setResult(sorted)
//  }

//  function nonactype(){
//   const sorted = [...result].sort((a, b) => {
//     return b.bustype - a.bustype;
//   });
//   setResult(sorted)
//  }




  return page ? (
    <NotFound />
  ) : (
    <Box
      sx={{
        height: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "row",
        mt:"1.5%"
      }}
    >
      <Box
        sx={{
          height: "30vh",
          width: "15%",
          backgroundColor: "white",
          ml:"2%",
          mt:"2%"
        }}
        boxShadow={3}
      >
        <Typography align="center" sx={{mt:"5%",fontWeight:"700",fontSize:"1.5rem"}}>
          Filters
        </Typography>

        <Typography sx={{m:"8%" ,fontSize:"1.2rem",fontWeight:"800"}}>Price</Typography>
        <Typography sx={{m:"5%" ,fontSize:"1rem",fontWeight:"700",cursor:"pointer"}} onClick={highprice} >High to Low</Typography>
        <Typography sx={{m:"5%" ,fontSize:"1rem",fontWeight:"700",cursor:"pointer"}} onClick={lowprice}>Low to Height</Typography>



        {/* <Typography sx={{m:"8%" ,fontSize:"1.2rem",fontWeight:"800"}}>Pickup Time</Typography>
        <Typography sx={{m:"5%",fontSize:"1rem",fontWeight:"700",cursor:"pointer"}} onClick={morning} >Monrning</Typography>
        <Typography sx={{m:"5%" ,fontSize:"1rem",fontWeight:"700",cursor:"pointer"}} onClick={night}>Night</Typography> */}
      </Box>
      <Box>
        {result.map((res) => (
          <Box
            sx={{
              mt:"2.5%",
               ml: "3%",
              width: "100%",
              minHeight: 230, 
              backgroundColor: "white",
              boxShadow: 5,
            }}
            key={res._id}
          >
            <Box
              sx={{
                width: 230,
                minHeight: 230,
                float: "right",
                boxShadow: 5,
                background: "#f0f0f1",
              }}
            >
              <Typography sx={{ fontSize: "1.3rem", pl: 8, pt: 7 }}>
                Price :{" "}
              </Typography>

              <Typography sx={{ fontSize: "3rem", pl: 8, fontWeight: 650 }}>
                {res.price}
              </Typography>
              <Button
                sx={{
                  backgroundColor: "yellow",
                  borderRadius: 4,
                   ml: 7,
                  mt: 2,
                }}
                value={res._id}
                onClick={(e) => seatBoxToogle(e.target.value)}
              >
                Select Seat
              </Button>
            </Box>

            <Box
              sx={{
                width: 230,
                minHeight: 230,
                backgroundColor: "white",
                float: "right",
                mr: 10,
              }}
            >
              <Typography
                sx={{ fontSize: "1.2rem", pt: 8, pl: 3, fontWeight: 600 }}
              >
                Date And Time
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", pt: 1, pl: 3, fontWeight: 600 }}
              >
                {moment(res.endingdate).format("DD/MM/YYYY")} {"--  "}{" "}
                {res.endingtime}{" "}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 230,
                minHeight: 230,
                backgroundColor: "white",
                float: "right",
                mr: 2,
              }}
            >
              <Typography
                sx={{ pl: 3, fontSize: "1.4rem", fontWeight: 1000, pt: 8 }}
              >
                To
              </Typography>
              <Typography sx={{ pl: 3, fontSize: "1.3rem", fontWeight: 900 }}>
                {res.to}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 230,
                minHeight: 230,
                backgroundColor: "white",
                float: "right",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", pt: 8, fontWeight: 600 }}>
                Date And Time
              </Typography>
              <Typography sx={{ fontSize: "1rem", pt: 1, fontWeight: 600 }}>
                {moment(res.startingdate).format("DD/MM/YYYY")} {"--  "}{" "}
                {res.startingtime}{" "}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 230,
                minHeight: 230,
                backgroundColor: "white",
                float: "right",
                mr: 2,
              }}
            >
              <Typography
                sx={{ pl: 3, fontSize: "1.4rem", fontWeight: 1000, pt: 8 }}
              >
                From
              </Typography>
              <Typography sx={{ pl: 3, fontSize: "1.3rem", fontWeight: 900 }}>
                {res.from}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 230,
                minHeight: 230,
                backgroundColor: "white",
                float: "right",
                mr: 2,
              }}
            >
              <Typography
                sx={{ fontSize: "2rem", pl: 3, pt: 8, fontWeight: 1000 }}
              >
                {res.busname}
              </Typography>
              <Typography component="span" sx={{ pl: 2 }}>
                {res.bustype} / {res.busseat} Seats{" "}
              </Typography>
              <Typography sx={{ pl: 3 }}>{res.regno}</Typography>
            </Box>

            {box && check == res._id && (
              <Box
                sx={{
                  ml: "8%",
                  width: "85%",
                  backgroundColor: "white",
                  border:"none"
                }}
              >
                <Seat data={id} />
              </Box>
            )}

            {console.log(check)}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Row;
