import asynchHandler from 'express-async-handler'
import generateToken from '../../utils/generatetoken.js'
import user from '../../models/usermodel.js'
import busmodel from '../../models/addbus.js'
import {OAuth2Client} from 'google-auth-library'
import companyuser from "../../models/company.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KkRC1ALfS5HumgApOR5RCBFjTT1dNvjR969AOTVkmWvcET5dI7p6J9AndSMJIHfQNauFTee5VfpF5YjsMTSRkyI00mpY6aANs')
import { v4 as uuidv4 } from 'uuid';
import bookbus from '../../models/Bookings.js'
const client=new OAuth2Client("944103586555-jpq0cub7572f755icvegut75tpsvbqgk.apps.googleusercontent.com")
import mongoose from "mongoose";
import company from '../../models/company.js'
const ObjectId = mongoose.Types.ObjectId
import bannermodel from '../../models/banner.js'
import bcrypt from 'bcryptjs'
 
const signupdata = asynchHandler(async(req,res)=>{
    const{firstname,lastname,email,password}=req.body
    const userExists=await user.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const newUser=new user({
        firstname,
        lastname,
        email,
        password
    });
    newUser.save()
    .then(()=>res.json('user added'))
    .catch(err => res.status(400).json('Error: ' +err))
}) 



const logindata = asynchHandler(async(req,res)=>{
    const {email,password} =req.body
    
    const users = await user.findOne({email})
    if(users){
        if(users &&(await users.matchPassword(password))){
            res.json({
                _id:users._id,
                firstname:users.firstname,
                lastname:users.lastname,
                email:users.email,
                token:generateToken(users._id),  
            })
        }else{
            res.json(402)
            throw new Error('Invalid password')
        }
    }else{
        res.json(401)
        throw new Error('Invalid email')
    }
    
})


const getallbus=asynchHandler(async(req,res)=>{
    const {from,to,date} = req.body
    const getbus=await busmodel.find({"$and":[{"from":{$eq:from}},{"to":{$eq:to}},{"startingdate":{$eq:date}}]})
    res.json(getbus)
})  


// Google signup and login  
const googlelogin= (async(req,res)=>{
   const {tokenId}=req.body 
   client.verifyIdToken({idToken:tokenId,audience:"944103586555-jpq0cub7572f755icvegut75tpsvbqgk.apps.googleusercontent.com"}).then(response=>{
       const { email_verified,email,given_name,family_name}=response.payload;
       console.log(response.payload)
       if(email_verified){
           user.findOne({email}).exec((err,users)=>{
               if(err){
                   return res.status(400).json({
                       error:"Something went wrong"
                   })
               }else{
                   if(users){
                       console.log(users)
                       const {_id,email,firstname,lastname} = users
                    res.json({
                        token:generateToken(users._id),
                        _id

                    })
                   }else{
                       let password=email+generateToken
                       let newuser = new user({firstname:given_name,lastname:family_name,email,password})
                       newuser.save((err,data)=>{
                           if(err){
                               return res.status(400).json({
                                   error:"something went wrong"
                               })
                           }
                           const {_id,email,firstname,lastname} = newuser
                           res.json({
                            token:generateToken(data._id),
                           _id
                        })
                       })
                   }
               }
           })
       }
   })
   console.log()
})

const busdetail=asynchHandler(async(req,res)=>{
    const onebusdetail=await busmodel.findOne({_id:req.params.id})
    res.json(onebusdetail)
})

const companydetail = (async(req,res)=>{
    const detail=await companyuser.find({_id:req.params.id})
    res.json(detail)
})

const Profile = (async(req,res)=>{
   const userprofile=await user.findOne({_id:req.params.id})
   res.json(userprofile)
})


const onebus=asynchHandler(async(req,res)=>{
    const onebusdetail=await busmodel.findOne({_id:req.params.id})
    res.json(onebusdetail)
})



const Checkout = asynchHandler(async(req,res)=>{
 
    let error,status

    try{
 
        console.log(req.body)
        const {userid,token,data,seat,seatdata,amount,companyid,coupenname}=req.body

        const booticket = new bookbus({
            userid:userid,
            busid:data._id,
            amount:amount,
            seat:seat,
            seatdata:seatdata,
            companyid:data.companyid

        })
        booticket.save()

        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const idempotencyKey = uuidv4()

        const charge = await stripe.charges.create(
            {
              amount: (data.price*seat.length)*100,
              currency: "usd",
              customer: customer.id,
              receipt_email: token.email,
              description: "Ticket have been booked",
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip,
                },
              },
            },
            {idempotencyKey}
          );

          const setseatonbus = await busmodel.findOneAndUpdate({_id:data._id},{$push:{seat}})
          const setcoupen = await user.findOneAndUpdate({_id:ObjectId(userid)},{$push:{coupenname}})
          
          
    }catch(error){
        console.log(error)
        status = "failure";
    }
    res.json({ error, status });
})

const Getseat = (async(req,res)=>{
    const getseat= await busmodel.findOne({_id:req.params.id})
    res.json(getseat)
})


const getbooking = (async(req,res)=>{
    const getseat = await bookbus.findOne({userid:req.params.id})
    console.log(getseat)
})


const mybookings = (async(req,res)=>{
    let id=req.params.id;
    const getbookings = await bookbus.aggregate([
        {
        $match:{userid:ObjectId(id)}
        },
        {
            $lookup:{
                from:'addbuses',
                localField:'busid',
                foreignField:'_id',
                as:"busdetail"
            }
        },
        {
            $unwind:'$busdetail'
        }

    ])
    res.json(getbookings)
})


const updateprofile =(async(req,res)=>{
    const {id,firstname,lastname,email} = req.body
    const updatedata = await user.findByIdAndUpdate(id,{firstname,lastname,email})
    res.json(updatedata)
})

const totalcount =(async(req,res)=>{
const total = await busmodel.find({companyid:req.params.id}).count()
res.json(total)
})

const totalbooking=(async(req,res)=>{
    let id = req.params.id
const totals= await bookbus.find({companyid:id}).count()
res.json(totals)
})

const totalincome=(async(req,res)=>{
    let id = req.params.id
    const income = await bookbus.aggregate([
        {
            $match:{companyid:ObjectId(id)}
        },
        {
           $group:
           {
               _id:'',
               "amount":{$sum:'$amount'}
           }
        },
        {
            $project:{
                _id:0,
                "totalamount":"$amount"
            }
        }
])
res.json(income)
})

const getreport=(async(req,res)=>{
let id=req.params.id
const report = await bookbus.aggregate([
    {
 $match:{companyid:ObjectId(id)}  
    },
    {
        $project:{
            month: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },amount:1
        }
    },
    {
        $group: {
            _id: "$month",
            numberOfBoookings: { $sum: 1 },
            amount:{$sum:'$amount'}
        }
    }
])
res.json(report)
})

const getallcompany = (async(req,res)=>{
    const  allcompany = await company.find({}).count()
   res.json(allcompany)
})

const getallbuses =(async(req,res)=>{
    const allbuses = await busmodel.find({}).count()
    res.json(allbuses)
})

const getallusers = (async(req,res)=>{
    const allusers = await user.find({}).count()
    res.json(allusers)
})

const totalincomes = (async(req,res)=>{
const income = await bookbus.aggregate([ { $group: { _id: " ", TotalSum: { $sum: "$amount" } } } ])
res.json(income)
})


const usedcoupen =(async(req,res)=>{
    const {coupens} = req.body
    let id = req.params.id

    let checkusedcoupen = await user.find({_id:ObjectId(id)})
   let used =  checkusedcoupen[0].coupenname.indexOf(coupens)
   res.json(used)
})

const getdetailticket = (async(req,res)=>{
    let id=req.params.id
    let bookingdata= await bookbus.aggregate([
        {
            $match:{_id:ObjectId(id)}
        },
        {
            $lookup:{
                from:'addbuses',
                localField:'busid',
                foreignField:'_id',
                as:"busdetail"
            }
        },
        {
            $unwind:"$busdetail"
        },
        {
            $unwind:'$seatdata'
        }
    ])
    res.json(bookingdata)
})

const getbannerall =(async(req,res)=>{    
    let banner = await bannermodel.find({})
    res.json(banner)
})

const checkpassword = (async(req,res)=>{
    let id = req.params.id
    const {values,newvalues} = req.body
    let check = await user.findOne({_id:id})
    if(check && (await check.matchPassword(values.password))){
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newvalues.newpassword,salt)
    let updatenewpassword = await user.findOneAndUpdate({_id:id},{password:password})
        console.log(updatenewpassword)
        res.json(200)
    }else{
        res.json(401)
    }
})

  
export  {signupdata,logindata,getallbus,googlelogin,busdetail,companydetail,Profile,onebus,Checkout,Getseat,getbooking,mybookings,updateprofile,totalcount,totalbooking,totalincome,getreport,getallcompany,getallbuses,getallusers,totalincomes,usedcoupen,getdetailticket,getbannerall,checkpassword}