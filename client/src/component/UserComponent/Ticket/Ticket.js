import React, { useEffect, useState } from "react";
import JsPDF from "jspdf";
import "../Ticket/Ticket.css";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Typography } from "@mui/material";

const Ticket = (props) => {

  const [data,setdata]=useState([])
  const { open ,bus,seat} = props;
  const navigate = useNavigate();


  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a5");
    report.html(document.querySelector("#report")).then(() => {
      report.save("Busticket.pdf");
      toast("Success ticket download is completed",{type:"success"})
      // navigate("/");
    });
  }

  function booking(){
    navigate('/mybookings')
  }



  return (
    <Dialog open={open} >
      <div class="tickets airline">
      
        <div class="ticket-inner">
          <div id="report">
            <Typography align="center" sx={{fontSize:"1.7rem",fontWeight:"800",marginBottom:"3%",color:"darkcyan"}}>Book My Bus</Typography>
            <Typography component="span" sx={{fontSize:"1.5rem",fontWeight:"600",marginLeft:"1%",marginBottom:"2%"}}>Bus Name :</Typography>
         <Typography component="span" sx={{fontSize:"1.5rem",fontWeight:"600",marginLeft:"5%"}}>{bus.busname}</Typography>
            <div class="route">
              <p>
                <span>{bus.from}</span>
                <span></span>
              </p>
              <svg
                id="Layer_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m348.143 167.858c7.81 7.811 7.81 20.474 0 28.284l-30.515 30.515 18.019 94.6c1.891 9.924-3.917 19.699-13.536 22.786-2.022.649-4.082.96-6.11.96-7.616 0-14.811-4.374-18.156-11.616l-27.475-59.472-45.085 45.085 8.858 8.858c7.81 7.811 7.81 20.474 0 28.284-3.906 3.905-9.025 5.858-14.143 5.858s-10.237-1.953-14.143-5.858l-46-46c-7.81-7.811-7.81-20.474 0-28.284 7.811-7.811 20.475-7.811 28.285 0l8.857 8.857 45.084-45.084-59.472-27.475c-9.171-4.237-13.742-14.648-10.656-24.267 3.087-9.619 12.865-15.427 22.786-13.536l94.601 18.019 30.514-30.514c7.812-7.811 20.476-7.811 28.287 0zm99-99c-7.811-7.811-20.475-7.811-28.285 0l-46 46c-7.81 7.811-7.81 20.474 0 28.284 3.905 3.905 9.024 5.858 14.142 5.858s10.237-1.953 14.143-5.858l46-46c7.809-7.81 7.809-20.474 0-28.284zm-320.286 292-58 58c-7.81 7.811-7.81 20.474 0 28.284 3.906 3.905 9.025 5.858 14.143 5.858s10.237-1.953 14.143-5.858l58-58c7.81-7.811 7.81-20.474 0-28.284-7.811-7.811-20.475-7.811-28.286 0z" />
                  <path d="m512 25c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zm-487 437c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25z" />
                </g>
              </svg>
              <p>
                <span>{bus.to}</span>
                <span></span>
              </p>
            </div>
            <div class="time">
            <p><span>Starts</span><span>{moment(bus.startingdate).format("DD/MM/YYYY")}</span><span>{bus.startingtime} a.m</span></p>
            <p><span>Arrives</span><span>{moment(bus.endingdate).format("DD/MM/YYYY")}</span> <span>{bus.endingtime} p.m</span></p>
            </div>
            <div class="flight">
              <p>
                <span>price</span>
                <span>{bus.price}</span>
              </p>
              <p>
                <span>Seat</span>
                <span>{seat}</span>
              </p>
            </div>
            
          </div>
          <div class="cta">
            <a onClick={generatePDF} type="button">
              <span class="pdf-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M444.875 109.792L338.208 3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.135 0 64 19.135 64 42.667v426.667C64 492.865 83.135 512 106.667 512h298.667C428.865 512 448 492.865 448 469.333v-352c0-2.833-1.125-5.541-3.125-7.541zM341.333 36.417l70.25 70.25h-48.917c-11.76 0-21.333-9.573-21.333-21.333V36.417zm85.334 432.916c0 11.76-9.573 21.333-21.333 21.333H106.667c-11.76 0-21.333-9.573-21.333-21.333V42.667c0-11.76 9.573-21.333 21.333-21.333H320v64C320 108.865 339.135 128 362.667 128h64v341.333z" />
                  <path d="M310.385 313.135c-9.875-7.771-19.26-15.76-25.51-22.01-8.125-8.125-15.365-16-21.656-23.5 9.813-30.323 14.115-45.958 14.115-54.292 0-35.406-12.792-42.667-32-42.667-14.594 0-32 7.583-32 43.688 0 15.917 8.719 35.24 26 57.698-4.229 12.906-9.198 27.792-14.781 44.573-2.688 8.052-5.604 15.51-8.688 22.406a177.185 177.185 0 00-7.302 3.427c-8.479 4.24-16.531 8.052-24 11.594C150.5 370.177 128 380.844 128 401.906c0 15.292 16.615 24.76 32 24.76 19.833 0 49.781-26.49 71.656-71.115 22.708-8.958 50.938-15.594 73.219-19.75 17.854 13.729 37.573 26.865 47.125 26.865 26.448 0 32-15.292 32-28.115 0-25.219-28.813-25.219-42.667-25.219-4.302.001-15.843 1.272-30.948 3.803zM160 405.333c-6.094 0-10.219-2.875-10.667-3.427 0-7.563 22.552-18.25 44.365-28.583 1.385-.656 2.792-1.313 4.219-1.99-16.021 23.23-31.865 34-37.917 34zm74.667-190.979c0-22.354 6.938-22.354 10.667-22.354 7.542 0 10.667 0 10.667 21.333 0 4.5-3 15.75-8.49 33.313-8.376-12.896-12.844-23.948-12.844-32.292zM242.844 329a220.999 220.999 0 001.938-5.625c3.958-11.875 7.521-22.542 10.698-32.146 4.427 4.875 9.198 9.865 14.313 14.979 2 2 6.958 6.5 13.563 12.135-13.148 2.865-27.137 6.417-40.512 10.657zm119.823 5.552c0 4.792 0 6.781-9.896 6.844-2.906-.625-9.625-4.583-17.917-10.229 3.01-.333 5.229-.5 6.479-.5 15.761 0 20.23 1.541 21.334 3.885z" />
                </svg>
              </span>
              Download Ticket
            </a>
          </div>
          <div class="cta">
            <a type="button" onClick={booking}>
              MY BOOKINGS
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Ticket;
