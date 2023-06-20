const router = require("express").Router();


router.get("/login",async(req,res,next)=>{
    try{
        res.send("login page here")
    }catch(err){console.log("error in index router",err)}
})
//login post
router.post("/login",async(req,res,next)=>{
    try{
        res.send("login post")
    }catch(err){console.log("error in index router",err)}
})

router.get("/register",async(req,res,next)=>{
    try{
        res.send("register page")
    }catch(err){console.log("error in index router",err)}
})
//register post
router.post("/register",async(req,res,next)=>{
    try{
        res.send("register post")
    }catch(err){console.log("error in index router",err)}
})

//logout
router.post("/logout",async(req,res,next)=>{
    try{
        res.send("logout")
    }catch(err){console.log("error in index router",err)}
})

module.exports=router;