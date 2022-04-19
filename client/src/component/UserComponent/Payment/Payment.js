import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Payment/Payment.css'
import moment from "moment";
import { Button, Grid, Typography } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {useNavigate} from "react-router-dom"
import Ticket from '../Ticket/Ticket'


const Payment = () => {
//	const navigate = useNavigate()
	toast.configure()

	const [open, setOpen] =useState(false);

	const [data,setdata] = useState([])

	//Seat number stored
	const [seat, setSeat] = useState([]);

	const [seatdata,setseatdata]=useState([])


	const [userid,setuserid]=useState('')

	const [coupen,setcoupen] = useState('')

	const [coupenname,setcoupenname] = useState('')

	//const [amount,setamount]=useState('')
	

	 useEffect(() => {
		(async()=>{
			let busid = localStorage.getItem("busid")
			try{
				let {data} = await axios.get(`/busdetail/${busid}`)
				setdata(data)
			}catch(err){
				console.log(err)
			}
		})()

		let seatdata = JSON.parse(localStorage.getItem("userseatdata"))
		setseatdata(seatdata)

		let reservedSeats = JSON.parse(localStorage.getItem("reservedSeats"));
		setSeat(reservedSeats);

		let userid = localStorage.getItem("userid")
		setuserid(userid)

		let coupenvalue = localStorage.getItem("coupen")
		setcoupen(coupenvalue)

		let coupenname = localStorage.getItem("coupenname")
		setcoupenname(coupenname)
	},[])				
	async function handleToken(token,addresses){
		if(coupen === null){
			var amount = (data.price*seat.length)
		}else{
			var amount = (data.price*seat.length)-((data.price*seat.length)*coupen/100)
		}
		const response = await axios.post('/checkout',{token,data,seat,seatdata,amount,userid,coupenname})
		if(response.status === 200){
			setOpen(true)
			toast("Success payment is completed",{type:"success"})
			localStorage.removeItem("busid")
			localStorage.removeItem("reservedSeats")
			localStorage.removeItem("userseatdata")
			localStorage.removeItem("coupen")
			localStorage.removeItem("coupenname")
			// navigate('/ticket')				
		}else{
			toast("Failure payment is not completed",{type:"failure"})
		}
	}


  return (
	  <Grid container sx={{minHeight:"80vh"}}>
		<Grid item xs={6}>
       <div class="ticket airline">
	<div class="title"><span>Ticket Detail</span>
	</div>
	<div class="ticket-inner">

		<div class="route">
			<p><span>{data.from}</span><span></span></p>
			<svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
				<g>
					<path d="m348.143 167.858c7.81 7.811 7.81 20.474 0 28.284l-30.515 30.515 18.019 94.6c1.891 9.924-3.917 19.699-13.536 22.786-2.022.649-4.082.96-6.11.96-7.616 0-14.811-4.374-18.156-11.616l-27.475-59.472-45.085 45.085 8.858 8.858c7.81 7.811 7.81 20.474 0 28.284-3.906 3.905-9.025 5.858-14.143 5.858s-10.237-1.953-14.143-5.858l-46-46c-7.81-7.811-7.81-20.474 0-28.284 7.811-7.811 20.475-7.811 28.285 0l8.857 8.857 45.084-45.084-59.472-27.475c-9.171-4.237-13.742-14.648-10.656-24.267 3.087-9.619 12.865-15.427 22.786-13.536l94.601 18.019 30.514-30.514c7.812-7.811 20.476-7.811 28.287 0zm99-99c-7.811-7.811-20.475-7.811-28.285 0l-46 46c-7.81 7.811-7.81 20.474 0 28.284 3.905 3.905 9.024 5.858 14.142 5.858s10.237-1.953 14.143-5.858l46-46c7.809-7.81 7.809-20.474 0-28.284zm-320.286 292-58 58c-7.81 7.811-7.81 20.474 0 28.284 3.906 3.905 9.025 5.858 14.143 5.858s10.237-1.953 14.143-5.858l58-58c7.81-7.811 7.81-20.474 0-28.284-7.811-7.811-20.475-7.811-28.286 0z" />
					<path d="m512 25c0 13.807-11.193 25-25 25s-25-11.193-25-25 11.193-25 25-25 25 11.193 25 25zm-487 437c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25z" />
					
				</g>
			</svg>
			<p><span>{data.to}</span><span></span></p>

		</div>
			
		<div class="time">
			<p><span>Starts</span><span>{moment(data.startingdate).format("DD/MM/YYYY")}</span><span>{data.startingtime} a.m</span></p>
			<p><span>Total Duration</span><span>{data.duration} Hrs</span></p>
			<p><span>Arrives</span><span>{moment(data.endingdate).format("DD/MM/YYYY")}</span> <span>{data.endingtime} p.m</span></p>
		</div>
		
		<div class="flight">
			<p><span>Bus Type</span><span>{data.bustype}</span></p>
			
				<p><span>Seats Selected</span><span>{seat.length}</span></p>
		</div>


{seatdata.map((data,i)=>(
	
			<div class="user">
			<p><span>Seat No</span><span>{seat[i]}</span></p>
		<p><span>Name</span><span>{data.name}</span></p>
		<p><span>Age(in yrs)</span><span>{data.age}</span></p>
		<p><span>Gender</span><span>{data.gender}</span></p>
		</div>
			
))}
		
	</div>
</div>
</Grid>

<Grid item xs={6} class="payment pay">
<div class="title"><span>Payment Detail</span></div>
<div class="fare">
<Typography sx={{fontWeight:600,fontSize:25}}>Bus Fare</Typography>
	<Typography sx={{fontWeight:600,fontSize:25}}>{data.price}</Typography>
</div>
<div class="fare">
	<Typography sx={{fontWeight:600,fontSize:25}}>Total Seat Selected</Typography>
	<Typography sx={{fontWeight:600,fontSize:25}}>{seat.length}</Typography>
</div>	

{ coupen != null && <div class="fare">
	<Typography sx={{fontWeight:600,fontSize:25}}>Coupen</Typography>
	<Typography sx={{fontWeight:600,fontSize:25}}>{coupen} %</Typography>
</div>}	
<hr/>
{ coupen === null ? <div class="fare">
	<Typography sx={{fontWeight:600,fontSize:25}}>Total</Typography>
	<Typography sx={{fontWeight:600,fontSize:25}}>{seat.length*data.price}</Typography>
</div> : <div class="fare">
	<Typography sx={{fontWeight:600,fontSize:25}}>Total</Typography>
	<Typography sx={{fontWeight:600,fontSize:25}}>{(seat.length*data.price)*coupen/100}</Typography>
</div>}
<hr/>
<hr/>
<div class="fare">
	<Typography sx={{fontWeight:600,fontSize:25}}>Pay With card</Typography>

{ coupen === null ? <StripeCheckout
stripeKey='pk_test_51KkRC1ALfS5HumgAPbUATJue0FnHTuBXyMVyxALHEmltCwgCs3clmaWTwbj4T9GhFwkzW1vuGDCwNVs967sb7pFb00PURkiAZU'
 token={handleToken}
 amount={(data.price*seat.length)*100}
 billingAddress
 shippingAddress
/> : <StripeCheckout
stripeKey='pk_test_51KkRC1ALfS5HumgAPbUATJue0FnHTuBXyMVyxALHEmltCwgCs3clmaWTwbj4T9GhFwkzW1vuGDCwNVs967sb7pFb00PURkiAZU'
 token={handleToken}
 amount={(data.price*seat.length)-((data.price*seat.length)*coupen/100)*100}
 billingAddress
 shippingAddress
/>}
</div>
</Grid>
<Ticket open={open} bus={data} seat={seat}/>
	</Grid>
  )
}

export default Payment





