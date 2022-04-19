import express from "express";
const router = express.Router();
import {signupdata,logindata,getallbus,googlelogin,busdetail,companydetail,Profile,onebus,Checkout,Getseat,getbooking,mybookings,updateprofile,totalcount,totalbooking,totalincome,getreport,getallcompany,getallbuses,getallusers,totalincomes,usedcoupen,getdetailticket,getbannerall,checkpassword} from '../helpers/user/userhelper.js'

router.post('/signup',signupdata)


router.post('/login',logindata)

router.post('/viewbus',getallbus)

router.post('/googlelogin',googlelogin)

router.get('/ticketdetail/:id',busdetail)

router.get('/busdetail/:id',onebus)

router.get('/companydetail/:id',companydetail)

router.get('/profile/:id',Profile)

router.post('/checkout',Checkout)

router.get('/getseatno/:id',Getseat)

router.get('/getbookings/:id',getbooking)

router.get('/mybookings/:id',mybookings)

router.post('/updateprofile',updateprofile)
 
router.get('/totalbus/:id',totalcount)
  
router.get('/totalbookings/:id',totalbooking)

router.get('/totalincome/:id',totalincome)

router.get('/getreport/:id',getreport)

router.get('/getallcompany',getallcompany)

router.get('/getallbuses',getallbuses)

router.get('/getallusers',getallusers)

router.get('/totalincome',totalincomes)

router.post('/usedcoupen/:id',usedcoupen)

router.get('/getdetailticket/:id',getdetailticket)

router.get('/getbannerall',getbannerall)

router.post('/checkpassword/:id',checkpassword)



export default router;