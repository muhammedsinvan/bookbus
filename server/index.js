import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userroutes from './routes/user.js'
import companyroutes from './routes/company.js'
import adminroutes from './routes/admin.js'
import cors from 'cors'
import path from 'path'


dotenv.config()

connectDB()

const app=express()



app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({ limit: "25mb", extended: true }))
app.use(cors())



app.use("/",userroutes)
app.use("/company",companyroutes)
app.use("/admin",adminroutes)


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1,'../', "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1,'../',  "client", "build", "index.html")
    );
  });
} else {
  console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
  console.log("API is running in development mode");
}


 const PORT =process.env.PORT || 5000

 app.listen(PORT,console.log(`server running on port ${process.env.NODE_ENV} mode on port ${PORT}`))