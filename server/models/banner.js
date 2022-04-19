import mongoose from "mongoose";

const bannerSchema=mongoose.Schema({
    title:{type:String,require:true},
    subtitle:{type:String,require:true},
    image:{type:String,require:true}
},{
    timestamps:true
})

const addbanner=mongoose.model('Banner',bannerSchema)

export default addbanner;