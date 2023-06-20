const express = require("express");
const mongoose = require("mongoose");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const cors = require('cors')
const {connection} =require("./configs/mongodbConnection");
require("dotenv").config();
const app = express();
app.set("view engine",'ejs');
app.use(express.static('public'));
//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/",require("./routes/index.route"));
app.use("/user",require("./routes/user.route"));
app.use("/auth",require("./routes/auth.route"))

app.use((req,res,next)=>{
    next(createHttpErrors.NotFound())
})
app.use((error,req,res,next)=>{
    error.status = error.status || 500;
    res.status = error.status ;  //this is the status for the browser
    res.render("error404",{error}) //or render any error page with ejs
    
})







app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log("connected to remote db")
        
    }catch(err){console.log(createHttpErrors(err))}
    console.log(`server started @ http://localhost:${process.env.port}`)
})