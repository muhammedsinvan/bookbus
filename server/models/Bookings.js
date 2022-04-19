import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

const bookbusSchema=mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,require:true},
    busid:{type:mongoose.Schema.Types.ObjectId,require:true},
    companyid:{type:mongoose.Schema.Types.ObjectId,require:true},
    amount:{type:Number,require:true},
    seat:[{type:String}],
    seatdata:[{name:String,age:Number,gender:String}]
},{
    timestamps:true
})

const bookbus=mongoose.model('Bookbus',bookbusSchema)
export default bookbus;

