import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

const addbusSchema=mongoose.Schema({
    companyid:{type:mongoose.Schema.Types.ObjectId,require:true},
    busname:{type:String,require:true},
    regno:{type:String,require:true},
    bustype:{type:String,require:true},
    busseat:{type:String,require:true},
    from:{type:String,require:true},
    to:{type:String,require:true},
    startingdate:{type:Date,require:true},
    startingtime:{type:String,require:true},
    endingdate:{type:Date,require:true},
    endingtime:{type:String,require:true},
    duration:{type:String,require:true},
    price:{type:Number,require:true},
    image1:{type:String,require:true},
    image2:{type:String,require:true},
    image3:{type:String,require:true},
    image4:{type:String,require:true},
    seat:[{type:String}],
    status:{type:String,require:true}
})

const addbus=mongoose.model('Addbus',addbusSchema)

export default addbus;