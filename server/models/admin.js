import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})


const admin=mongoose.model('admin',adminSchema)
export default admin