const { response } = require('express');
const express=require('express')
const mongoose=require('mongoose')
const port=process.env.PORT||5000;
const app=express();
require('dotenv').config()
const cors=require('cors')
const authroutes=require('./routes/auth')
const cookieParser = require('cookie-parser')

//for emailverify
const nodemailer=require('nodemailer')
const uuid9 =require('uuid')
app.get('/api',(req,res)=>{
    res.send("running");
})


//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authroutes)


//email verify
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,

    }
})
transporter.verify((error,success)=>{
    if(error){
        console.log(`error in node mailer`)
    }else{
        console.log("nodemailer working fine")
    }
})
mongoose
.connect(process.env.DATABASE_ATLAS)
.then(()=>console.log("database connected successfully..."))
.catch((err)=>{
 console.log(err)
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})