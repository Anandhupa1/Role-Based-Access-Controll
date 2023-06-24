const router = require("express").Router();
const bcrypt = require("bcrypt")
const  { UserModel} = require("../models/user.model")
const sessionStorage = require("sessionstorage");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {passport} = require("../configs/google.oAuth")

router.get("/login",ensureNotAuthenticated,async(req,res,next)=>{
    try{

        res.render('login');
        
    }catch(err){console.log("error in index router",err)}
})
//login post
router.post("/login",async(req,res,next)=>{
    try{
        if(!req.body.email){
            req.flash("danger","enter your email address please");
            const messages = req.flash();
            res.render("login",{messages})}
        else if(!req.body.password){
            req.flash("danger","you haven't entered your password");
            const messages = req.flash();
            res.render("login",{messages})}
       else{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let validated = emailRegex.test(req.body.email);
        if(!validated){  
        req.flash("warning","enter a valid email");
        const messages = req.flash();
        res.render("login",{messages})}
        else{
            //check user exists or not.
            let userData = await UserModel.findOne({email:req.body.email});
            if(!userData){
                req.flash("danger","no user exists with this email,please register");
                const messages = req.flash();
                res.render("register",{messages})
            }else{
                const val = await bcrypt.compare(req.body.password,userData.password);
                if(!val){
                    req.flash("warning","password doesn't match");
                    const messages = req.flash();
                    res.render("login",{messages})
                }
                else{
                req.flash("success",` Hi ${userData.name} !, login successfull `);
                const messages = req.flash();
                //res.send(userData)
                 req.session.user = userData;
                 res.render("authSuccessfull",{messages,user:userData,newUser:userData,msg:`Happy to meet you again`})
                }
            }
            
        
        }
       }
      
    }catch(err){console.log("error in index router",err)}
})

router.get("/register",ensureNotAuthenticated,async(req,res,next)=>{
    try{
        // req.flash("erro3","some errror from flash")
        // const messages = req.flash();
        // console.log(messages);
        // res.render("register",{messages})
        res.render("register")
    }catch(err){console.log("error in index router",err)}
})
//register post
router.post("/register",async(req,res,next)=>{
    try{
    let {name,email,password,cPassword} = req.body;
    if(!name  ){res.render("success",{error:"please enter your name"})}
    else if(!email){res.render("success",{error:"please enter your email"})}
    else if(!password || !cPassword || cPassword!==password){res.render("success",{error:"enter passwords correctly"})}
    else {
        
        let userExists = await UserModel.findOne({email:req.body.email})
        if(userExists){
            req.flash("warning","user already exists ,please register");
            const messages = req.flash();
            res.render("login",{messages})
            
        
        }
        else {
            let out = new UserModel(req.body);
            await out.save();
            res.render("authSuccessfull",{newUser:out,msg:`Welcome !!!`})
        }   
        
    }
    }catch(err){console.log("error in index router",err)}
})

//logout
router.post("/logout",async(req,res,next)=>{
    try{
        res.send("logout")
    }catch(err){console.log("error in index router",err)}
})

router.get("/logout",async(req,res,next)=>{
    try{
        req.session.destroy((err) => {
            res.redirect('/') // will always fire after session is destroyed
          })
    }catch(err){next(err)}
})



// google auth implimentation starts here___________________________________________________________
router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {

       
        failureRedirect: '/auth/login', //again redirecting to login page
        session:false//we are not using session, if you want to use session you can remove this.
}),
async (req,res)=>{

//console.log(req.user)
let userData ; 
let userExists= await UserModel.findOne({email:req.user.email});
if(userExists){userData=userExists
}else {

 let newUser =new UserModel(req.user);
 await newUser.save();
 userData = newUser;
}

// res.locals.user=userData;
// console.log(userData)
// res.render("index")
// store user data in session 
req.flash("success",` Hi ${userData.name} !, login successfull `);
const messages = req.flash();
req.session.user = userData;
res.render("authSuccessfull",{user:userData,newUser:userData,adminView:false,msg:`Happy to meet you again`})
// console.log(userData)
// res.redirect("/") //redirect to any page
}

);
// google auth implimentation starts here______________________________________________________________








module.exports=router;



function ensureNotAuthenticated(req,res,next){
    if(req.session.user){
        res.redirect("/")
    }else{
        next();
    }
}