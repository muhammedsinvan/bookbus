import mongoose from "mongoose";

const coupenSchema= mongoose.Schema({
    name:{type:String,require:true},
    value:{type:String,require:true},
    date:{type:Date,require:true}
})

const coupen= mongoose.model('coupen',coupenSchema)

export default coupen