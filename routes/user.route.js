const router = require("express").Router();


router.get("/profile",async(req,res,next)=>{
    try{
        res.render("profile")
    }catch(err){console.log("error in index router",err)}
})


module.exports=router;