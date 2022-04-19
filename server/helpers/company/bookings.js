// import asyncHandler from "express-async-handler";
import Bookings from '../../models/Bookings.js'
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId


const userdetail = (async(req,res)=>{
    let id = req.params.id
    const bookingdetail = await Bookings.aggregate([
        {
            $match:{busid:ObjectId(id)}
        },
        {
        $unwind:'$seatdata'
    }])
res.json(bookingdetail)
})

const getweeklybooking = (async(req,res)=>{
    let id = req.params.id
    let bookingweekly = await Bookings.aggregate([
        {
            $match:{companyid:ObjectId(id)}
        },
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
    res.json(bookingweekly)
})

const getgenderbooking = (async(req,res)=>{
    let id = req.params.id
    let genderbooking = await Bookings.aggregate([
        {
            $match:{companyid:ObjectId(id)}
        },
        {
            $project:{seatdata:1}
        },
        {
            $unwind:'$seatdata'
        },
        {
            $group:{
                _id:{gender:"$seatdata.gender"},
                count:{$sum:1}
            }
        }
    ])
    res.json(genderbooking)
})



export{userdetail,getweeklybooking,getgenderbooking}