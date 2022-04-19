import mongoose  from "mongoose";
import bcrypt from "bcryptjs"


const companySchema = mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true},
    company:{type:String,require:true},
    number:{type:Number,require:true},
    password:{type:String,require:true}
})


companySchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


companySchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})


const company = mongoose.model('Company',companySchema)

export default company;