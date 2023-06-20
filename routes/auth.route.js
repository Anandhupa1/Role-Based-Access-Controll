const router = require("express").Router();


router.get("/login",async(req,res,next)=>{
    try{
        res.render('login');
        
    }catch(err){console.log("error in index router",err)}
})
//login post
router.post("/login",async(req,res,next)=>{
    try{
        console.log(req.body)
        res.send(req.body)
    }catch(err){console.log("error in index router",err)}
})

router.get("/register",async(req,res,next)=>{
    try{
        res.render("register")
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