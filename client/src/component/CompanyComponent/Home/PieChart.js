
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 }
];

const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App() {


    const [gender,setgender]= useState([])
   

    useEffect(()=>{
        (async()=>{
            try{
                let companyid = localStorage.getItem('companyid')
                let genderbooking = await axios.get(`/company/getgenderbooking/${companyid}`)
                setgender(genderbooking.data)

            }catch(error){
                console.log(error)
            }
        })()
    },[])

return (
 <>
 <Typography align="center" sx={{mt:15,fontSize:"1.5rem",fontWeight:700}}>Gender Bookings</Typography>
  <PieChart width={400} height={400}  >
    <Pie
      data={gender}
      cx={200}
      cy={200}
      labelLine={false}             
      label={renderCustomizedLabel}
      outerRadius={180}
      fill="#8884d8"
      dataKey="count"
    >
      {gender.map((entry, index) => (
        <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>                                                                                                                             
  </PieChart>

  <Box  sx={{width:"5%",backgroundColor:"blue"}}/>
  </>                                                                                                                                                                                                                                                                                                                                 
);
}
