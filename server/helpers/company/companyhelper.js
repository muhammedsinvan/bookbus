 import asynchHandler from 'express-async-handler';
import generateToken from '../../utils/generatetoken.js'
import companyuser from "../../models/company.js";


const signupdata = asynchHandler(async(req,res)=>{
    const {firstname,lastname,email,company,number,password}=req.body

    const userExists= await companyuser.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }

    const newCompany=new companyuser({
        firstname,
        lastname,
        email,
        company,
        number,
        password
    })
    newCompany.save()
    .then(()=>res.json('company added'))
    .catch(err => res.status(400).json('Error: ' +err))
})

const logindata = asynchHandler(async(req,res)=>{
    const {email,password} = req.body

    const companys =await companyuser.findOne({email})

    if(companys &&(await companys.matchPassword(password))){
        res.json({
            _id:companys._id,
            firstname:companys.firstname,
            lastname:companys.lastname,
            email:companys.email,
            number:companys.number,
            company:companys.company,
            token:generateToken(companys._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})




export {signupdata,logindata}