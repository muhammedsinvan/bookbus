import generateToken from "../../utils/generatetoken.js";
import admin from "../../models/admin.js";
import companyuser from "../../models/company.js";
import busmodel from '../../models/addbus.js'
const ObjectId = mongoose.Types.ObjectId
import mongoose from "mongoose";
import user from "../../models/usermodel.js";
import bookbus from "../../models/Bookings.js";
import coupen from "../../models/coupen.js";
import cloudinary from "../../utils/cloudinary.js";
import banner from "../../models/banner.js"
import asyncHandler from "express-async-handler";

const logindata = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {email,password} = req.body
    const adminlogin = await admin.findOne({email,password});
    if (adminlogin) {
      res.status(200);
      
      res.json({
        email: adminlogin.email,
        admintoken: generateToken(adminlogin._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or passwgitord");
    }
  });





const getcompany = (async(req,res)=>{
    const getallcompany = await companyuser.find({})
    res.json(getallcompany)
})

const getbuses = (async(req,res)=>{
    let id=req.params.id
    const getbus = await busmodel.find({companyid:ObjectId(id)})
    res.json(getbus)
})

const getalluser = (async(req,res)=>{
    const getusers = await user.find({})
    res.json(getusers)
})

const getallbookings = (async(req,res)=>{
    let id = req.params.id
    const getbooking = await bookbus.aggregate([
        {
            $match:{userid:ObjectId(id)}
        },
        {
            $unwind:'$seatdata'
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
        }
    ])

   res.json(getbooking) 
})

const getallcompany = (async(req,res)=>{
    let getcompany = await bookbus.aggregate([
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
    ]).sort({_id:1})
res.json(getcompany)
})

const newcoupen =(async(req,res)=>{
    const {name,value,date}=req.body
const addcoupen = new coupen({name,value,date})
let data = await addcoupen.save()
res.json(data)
}) 

const allcoupen =(async(req,res)=>{
    let data = await coupen.find({})
    res.json(data)
})

const deletecoupen = (async(req,res)=>{
   let data = await coupen.deleteOne({_id:req.params.id})
   res.json(data)
})

const checkcoupen = (async(req,res)=>{
   const {coupens} = req.body
   let check = await coupen.find({name:coupens})
   res.json(check)
})

const newbanner = (async(req,res)=>{
    const {title,subtitle,image} = req.body
    const response = await cloudinary.uploader.upload(image)
    const newbanner =new banner({
        title,
        subtitle,
        image:response.secure_url
    })
  let bannernew = await  newbanner.save()
  res.json(bannernew)
})

const getallbanner =(async(req,res)=>{
    const response = await banner.find({})
    res.json(response)
})

const deletebanner = (async(req,res)=>{
    const deleted = await banner.deleteOne({_id:req.params.id})
    res.json(deleted)
})
  
const getweeklybooking = (async(req,res)=>{
    console.log("start")
    let getbooking = await bookbus.aggregate([
        {
                $group : {
                   _id :{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
                   list: { $push: "$$ROOT" },
                   count: { $sum: 1 }   
                }
        },
        {
            $sort:{_id:-1}
        },
        {
            $limit:7
        }
        ])
        res.json(getbooking)
})  

export {logindata,getcompany,getbuses,getalluser,getallbookings,getallcompany,newcoupen,allcoupen,deletecoupen,checkcoupen,newbanner,getallbanner,deletebanner,getweeklybooking}