const { response } = require('express');
const express=require('express')
const mongoose=require('mongoose')
const port=process.env.PORT||5000;
const app=express();
const cors=require('cors')
const authroutes=require('./routes/auth')

app.get('/api',(req,res)=>{
    res.send("running");
})


//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth',authroutes)


const db="mongodb+srv://ravi1:mongo123@cluster0.20zl3qv.mongodb.net/myreacttest?retryWrites=true&w=majority"
mongoose
.connect(db)
.then(()=>console.log("database connected successfully..."))
.catch((err)=>{
 console.log(err)
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})