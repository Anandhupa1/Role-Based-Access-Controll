const router = require("express").Router();
const  { UserModel} = require("../models/user.model")

router.get("/login",async(req,res,next)=>{
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
                req.flash("success",` Hi ${userData.name} !, login successfull `);
                const messages = req.flash();
                res.render("success",{messages})
            }
            
        
        }
       }
      
    }catch(err){console.log("error in index router",err)}
})

router.get("/register",async(req,res,next)=>{
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
        if(userExists){res.redirect("/auth/login")}
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

module.exports=router;