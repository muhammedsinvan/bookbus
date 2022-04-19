
import asyncHandler from "express-async-handler";
import companybus from "../../models/addbus.js";
import cloudinary from "../../utils/cloudinary.js";

const addbus= asyncHandler(async(req,res)=>{
    console.log(req.body.price)

    const {companyid,busname,regno,bustype,busseat,from,to,startingdate,startingtime,endingdate,endingtime,duration,price,image1,image2,image3,image4,status} = req.body
    const response1= await cloudinary.uploader.upload(image1)
    const response2= await cloudinary.uploader.upload(image2)
    const response3= await cloudinary.uploader.upload(image3)
    const response4= await cloudinary.uploader.upload(image4)
    const newbus=new companybus({
        companyid,
        busname,
        regno,
        bustype,
        busseat,
        from,
        to,
        startingdate,
        startingtime,
        endingdate,
        endingtime,
        duration,
        price,
        image1:response1.secure_url,
        image2:response2.secure_url,
        image3:response3.secure_url,
        image4:response4.secure_url,
        status
    })
    newbus.save()
    .then(()=>res.json('newbus added'))
    .catch(err=> res.status(400).json('Error:' +err))
})



const viewbus=asyncHandler(async(req,res)=>{
    var companyid=req.params.id
    const bus=await companybus.find({companyid})
    res.json(bus)
})


const singlebus=asyncHandler(async(req,res)=>{
    const busdetail=await companybus.findOne({_id:req.params.id})
    res.json(busdetail)
})

// const editbus = (async(req,res)=>{
//     const busdata= await companybus.findOne({_id})
// })

const deletebus = (async(req,res)=>{
   let data= await companybus.deleteOne({_id:req.params.id})
   res.json(data)
})

export{addbus,viewbus,singlebus,deletebus}



