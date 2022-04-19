import express from 'express'
const router = express.Router()
import {signupdata,logindata} from '../helpers/company/companyhelper.js'
import {addbus,viewbus,singlebus,deletebus} from '../helpers/company/addbus.js'
import {userdetail,getweeklybooking,getgenderbooking} from '../helpers/company/bookings.js'




router.post('/signup',signupdata)
router.post('/login',logindata)
router.post('/home/addbus',addbus)
router.get('/allbus/:id',viewbus)
router.get('/singlebus/:id',singlebus)
router.get('/editbus/:id',singlebus)
router.post('/deletebus/:id',deletebus)
router.get('/bookingdata/:id',userdetail)
router.get('/getweeklybooking/:id',getweeklybooking)
router.get('/getgenderbooking/:id',getgenderbooking)

export default router