const express = require("express");
const mongoose = require("mongoose");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const sessionStorage = require("sessionstorage")
const cors = require('cors');
const session = require("express-session");
const connectFlash = require("connect-flash");
const connectMongo = require("connect-mongo");
const {connection} =require("./configs/mongodbConnection");
require("dotenv").config();
const app = express();
app.set("view engine",'ejs');
app.use(express.static('public'));
//middlewares
app.use(express.json());
 app.use(express.urlencoded({extended:false}))
app.use(cors());
// const MongoStore =  connectMongo(session);
app.use(session({
    secret : process.env.sessionSecret,
    resave : false,
    saveUninitialized:false,
    cookie:{
        // secure:true,
        //at production only use secure true, ie only with https requests
        // httpOnly:true
        //stops accessing from browser by user
    },
    // store: new MongoStore({mongooseConnection:mongoose.connection})
}))
//flash
app.use(connectFlash())
app.use((req,res,next)=>{
    if(req.session.user){res.locals.user=req.session.user}
    else {res.locals.user=false}
    
   
    next()
})

//routes
app.use("/",require("./routes/index.route"));
app.use("/user",require("./routes/user.route"));
app.use("/auth",require("./routes/auth.route"));
app.use("/admin",require("./routes/admin.router"))
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


